"use client";

import React, { useState, useEffect } from "react";
import { Inbox, Mail, Trash2, CheckCircle2 } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { ContactMessage } from "@/types/database";

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);

  useEffect(() => {
    fetch("/api/messages")
      .then((res) => res.json())
      .then((data) => {
        if (data?.messages) setMessages(data.messages);
      })
      .catch(() => {});
  }, []);

  const toggleRead = async (id: string, currentRead: boolean) => {
    setMessages((prev) =>
      prev.map((m) => (m.id === id ? { ...m, read: !currentRead } : m))
    );
    await fetch("/api/messages", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, read: !currentRead }),
    });
  };

  const deleteMessage = async (id: string) => {
    if (confirm("Delete this inquiry?")) {
      setMessages((prev) => prev.filter((m) => m.id !== id));
      await fetch(`/api/messages?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
    }
  };

  const unreadCount = messages.filter((m) => !m.read).length;

  return (
    <div className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto w-full max-w-5xl mx-auto space-y-6">
      <div>
        <span className="text-[11px] font-mono uppercase tracking-wider text-[#7d6657]">
          Admin / Content Collections
        </span>
        <h1 className="font-serif text-2xl sm:text-3xl font-medium text-[#201a16] mt-1">
          Inquiries &amp; Messages
        </h1>
        <p className="text-xs text-[#634f43] mt-1">
          Contact form submissions and collaboration inquiries from portfolio visitors.
          {unreadCount > 0 && (
            <span className="ml-2 inline-flex items-center px-2 py-0.5 rounded-full bg-[#201a16] text-white text-[10px] font-mono">
              {unreadCount} unread
            </span>
          )}
        </p>
      </div>

      {messages.length === 0 ? (
        <div className="bg-white border border-[#e8e2d9] rounded-2xl p-12 sm:p-16 flex flex-col items-center text-center gap-3">
          <Inbox className="w-10 h-10 text-[#c7b49e]" />
          <p className="font-serif text-lg text-[#201a16]">No messages yet</p>
          <p className="text-xs text-[#7d6657]">Contact form submissions will appear here.</p>
        </div>
      ) : (
        <div className="space-y-3">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`bg-white border rounded-2xl p-4 sm:p-5 transition-colors shadow-xs ${
                msg.read ? "border-[#e8e2d9]" : "border-[#ded2c0] bg-[#fcfbfa]"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="shrink-0 mt-0.5">
                  <div
                    className={`w-2.5 h-2.5 rounded-full ${
                      msg.read ? "bg-[#e8e2d9]" : "bg-emerald-500 animate-pulse"
                    }`}
                  />
                </div>
                <div className="flex-1 min-w-0 space-y-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-semibold text-[#201a16]">{msg.name}</span>
                      <a
                        href={`mailto:${msg.email}`}
                        className="text-[11px] font-mono text-[#7d6657] hover:text-[#201a16] hover:underline"
                      >
                        {msg.email}
                      </a>
                    </div>
                    {msg.created_at && (
                      <span className="text-[10px] font-mono text-[#a9937c]">
                        {formatDate(msg.created_at)}
                      </span>
                    )}
                  </div>

                  <p className="text-xs font-medium text-[#201a16] pt-1">{msg.subject}</p>
                  <p className="text-xs text-[#634f43] leading-relaxed pt-1">{msg.message}</p>

                  <div className="pt-3 flex flex-wrap items-center gap-2">
                    <a
                      href={`mailto:${msg.email}?subject=Re: ${msg.subject || "Inquiry"}`}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#201a16] text-white text-xs font-mono font-medium hover:bg-[#362b25] transition-colors"
                    >
                      <Mail className="w-3 h-3" />
                      <span>Reply via Email</span>
                    </a>
                    <button
                      onClick={() => toggleRead(msg.id, msg.read)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[#e8e2d9] bg-[#faf8f5] text-xs font-mono text-[#634f43] hover:text-[#201a16] transition-colors"
                    >
                      <CheckCircle2 className="w-3 h-3" />
                      <span>{msg.read ? "Mark Unread" : "Mark Read"}</span>
                    </button>
                    <button
                      onClick={() => deleteMessage(msg.id)}
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs font-mono text-red-500 hover:bg-red-50 transition-colors"
                    >
                      <Trash2 className="w-3 h-3" />
                      <span>Delete</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
