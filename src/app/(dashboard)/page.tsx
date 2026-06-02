"use client";

import React, { useState, useEffect } from "react";

interface UserInfo {
  name: string;
  role: string;
  username: string;
}

export default function DashboardPage() {
  const [user, setUser] = useState<UserInfo>({ name: "Người dùng", role: "Thành viên", username: "user" });

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (e) {
        console.error("Failed to parse user info", e);
      }
    }
  }, []);

  return (
    <div className="flex-grow flex items-center justify-center bg-slate-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center space-y-4 max-w-md w-full">
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight sm:text-5xl">
          Xin chào, <span className="bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">{user.name}</span>!
        </h1>
        <p className="text-slate-500 text-sm">
          Chào mừng bạn đến với hệ thống quản trị của Redmine Portal.
        </p>
      </div>
    </div>
  );
}
