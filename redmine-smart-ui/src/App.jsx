import React, { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  CalendarDays,
  Check,
  Clock3,
  FolderKanban,
  LayoutDashboard,
  Monitor,
  Smartphone,
  User,
  X,
} from "lucide-react";

const workflowStatusStyle = {
  "Mới tiếp nhận": "bg-slate-100 text-slate-600 ring-slate-200",
  "Đang khảo sát": "bg-blue-50 text-blue-700 ring-blue-100",
  "Chờ phê duyệt": "bg-amber-50 text-amber-700 ring-amber-100",
  "Đang triển khai": "bg-orange-50 text-orange-700 ring-orange-100",
  "Đã đóng": "bg-emerald-50 text-emerald-700 ring-emerald-100",
};

const steps = [
  "Tiếp nhận yêu cầu",
  "Khảo sát",
  "Đề xuất giải pháp",
  "Phê duyệt giải pháp",
  "Triển khai",
  "Kết thúc",
];

const initialRequests = [
  {
    id: "#1025",
    title: "Không in được phiếu LIS",
    project: "System",
    assignee: "Trần Bình",
    created: "25/05/2026 08:32",
    due: "26/05/2026 17:00",
    priority: "Cao",
    sla: "Còn 04 giờ 20 phút",
    status: "Đang triển khai",
    description: "Không thể in phiếu kết quả tại máy tiếp nhận; ảnh quy trình trả kết quả.",
    timeline: [
      { label: "Tiếp nhận yêu cầu", state: "done", time: "25/05/2026 08:32" },
      { label: "Khảo sát", state: "done", time: "25/05/2026 09:10 - 10:40", comment: "Máy in hỏng cổng USB, driver bị lỗi driver.", user: "IT Helpdesk" },
      { label: "Đề xuất giải pháp", state: "done", time: "25/05/2026 11:15", comment: "Cập nhật template LIS, thay cáp kết nối máy in và cài lại driver.", user: "Trần Bình" },
      { label: "Phê duyệt giải pháp", state: "done", time: "25/05/2026 13:20", comment: "Đồng ý triển khai phương án này.", user: "Trần Bình" },
      { label: "Triển khai", state: "active", time: "Bắt đầu 25/05/2026 14:00" },
      { label: "Kết thúc", state: "todo", time: "" },
    ],
  },
  {
    id: "#1028",
    title: "Tạo tài khoản CRM Opla",
    project: "Hỗ trợ người dùng",
    assignee: "Chưa phân công",
    created: "25/05/2026 14:10",
    due: "26/05/2026 14:10",
    priority: "Trung bình",
    sla: "Còn 22 giờ",
    status: "Mới tiếp nhận",
    description: "Cần tạo tài khoản cho nhân sự mới thuộc phòng CSKH.",
    timeline: steps.map((label, index) => ({
      label,
      state: index === 0 ? "done" : "todo",
      time: index === 0 ? "25/05/2026 14:10" : "",
    })),
  },
];

function Badge({ children, className = "" }) {
  return <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${className}`}>{children}</span>;
}

function getStepAction(request, idx) {
  const step = request.timeline[idx];
  if (step.state === "done") {
    return { type: "info", message: `Đã hoàn thành`, time: step.time };
  }

  let nextAllowedIdx = -1;
  let actionLabel = "";

  if (request.status === "Mới tiếp nhận") {
    nextAllowedIdx = 1;
    actionLabel = "Bắt đầu khảo sát";
  } else if (request.status === "Đang khảo sát") {
    nextAllowedIdx = 2;
    actionLabel = "Đề xuất giải pháp";
  } else if (request.status === "Chờ phê duyệt") {
    const deXuatActive = request.timeline.some(s => s.label === "Đề xuất giải pháp" && s.state === "active");
    if (deXuatActive) {
      nextAllowedIdx = 3;
      actionLabel = "Phê duyệt giải pháp";
    } else {
      nextAllowedIdx = 4;
      actionLabel = "Bắt đầu triển khai";
    }
  } else if (request.status === "Đang triển khai") {
    nextAllowedIdx = 5;
    actionLabel = "Hoàn tất yêu cầu (Đóng)";
  }

  if (idx === nextAllowedIdx) {
    return { type: "action", label: actionLabel };
  }

  if (step.state === "active") {
    return { type: "info", message: "Đang thực hiện", time: step.time };
  }

  return { type: "disabled", message: "Chưa đến bước này" };
}

function TimelineMini({ timeline, request, onAdvance }) {
  const [activeIdx, setActiveIdx] = useState(null);

  React.useEffect(() => {
    if (activeIdx === null) return;
    const handleClose = () => setActiveIdx(null);
    window.addEventListener("click", handleClose);
    return () => window.removeEventListener("click", handleClose);
  }, [activeIdx]);

  return (
    <div className="mt-4 grid grid-cols-6 gap-1 border-t border-slate-100 pt-3">
      {timeline.map((step, idx) => {
        const isDone = step.state === "done";
        const isActive = step.state === "active";
        
        let dateStr = "";
        if (step.time) {
          const match = step.time.match(/(\d{2})\/(\d{2})\/(\d{4})\s*(\d{2}:\d{2})?/);
          if (match) {
            const [, d, m, , time] = match;
            dateStr = time ? `${d}/${m} ${time}` : `${d}/${m}`;
          } else {
            dateStr = step.time.replace("Bắt đầu ", "").replace("Hoàn tất ", "").substring(0, 10);
          }
        }

        const shortLabels = {
          "Tiếp nhận yêu cầu": "Bắt đầu",
          "Khảo sát": "Khảo sát",
          "Đề xuất": "Đề xuất",
          "Đề xuất giải pháp": "Đề xuất",
          "Phê duyệt giải pháp": "Phê duyệt",
          "Triển khai": "Triển khai",
          "Kết thúc": "Kết thúc",
        };
        const label = shortLabels[step.label] || step.label;
        const stepAction = getStepAction(request, idx);
        const isOpen = activeIdx === idx;

        return (
          <div 
            key={step.label} 
            className="relative flex flex-col items-center text-center cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              setActiveIdx(isOpen ? null : idx);
            }}
          >
            <div className="relative flex w-full items-center justify-center">
              <div className={`absolute left-0 right-1/2 top-1.5 h-0.5 -translate-y-1/2 ${idx === 0 ? "invisible" : (isDone || isActive ? "bg-emerald-500" : "bg-slate-200")}`} />
              <div className={`absolute left-1/2 right-0 top-1.5 h-0.5 -translate-y-1/2 ${idx === timeline.length - 1 ? "invisible" : (isDone ? "bg-emerald-500" : "bg-slate-200")}`} />
              <div className={`relative z-10 h-3 w-3 rounded-full border-2 transition-all ${
                isDone 
                  ? "bg-emerald-500 border-emerald-500" 
                  : isActive 
                    ? "bg-blue-600 border-blue-600 ring-2 ring-blue-100" 
                    : "bg-white border-slate-300 hover:border-blue-400"
              }`} />
            </div>
            <span className={`mt-1.5 block text-[10px] font-bold leading-tight ${isActive ? "text-blue-600" : isDone ? "text-slate-800" : "text-slate-400"}`}>
              {label}
            </span>
            <span className="mt-0.5 block text-[9px] text-slate-500 leading-none min-h-[9px]">
              {dateStr || "-"}
            </span>

            <AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 5, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 5, scale: 0.95 }}
                  transition={{ duration: 0.15 }}
                  onClick={(e) => e.stopPropagation()}
                  className="absolute bottom-12 left-1/2 z-35 w-52 -translate-x-1/2 rounded-xl border border-slate-100 bg-white p-3 shadow-xl text-left font-sans"
                >
                  <div className="absolute -bottom-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rotate-45 border-b border-r border-slate-100 bg-white" />
                  
                  <div className="text-xs">
                    <p className="font-bold text-slate-900 mb-1">{step.label}</p>
                    {stepAction.type === "info" && (
                      <div className="space-y-1.5">
                        <span className="inline-flex items-center gap-1 rounded bg-slate-50 px-1.5 py-0.5 text-[10px] font-semibold text-slate-600">
                          {stepAction.message}
                        </span>
                        {stepAction.time && <p className="text-[10px] text-slate-500">{stepAction.time}</p>}
                        {step.comment && (
                          <div className="text-[10px] text-slate-600 bg-slate-50 border border-slate-100 p-2 rounded-lg whitespace-pre-line leading-relaxed max-h-24 overflow-y-auto">
                            {step.user && <strong className="text-slate-800 block mb-0.5">{step.user}:</strong>}
                            {step.comment}
                          </div>
                        )}
                      </div>
                    )}

                    {stepAction.type === "disabled" && (
                      <p className="text-[10px] text-slate-400 italic">{stepAction.message}</p>
                    )}

                    {stepAction.type === "action" && (
                      <div className="mt-2">
                        <p className="text-[10px] text-slate-500 mb-2">Hành động tiếp theo:</p>
                        <button
                          onClick={() => {
                            onAdvance(request.id, stepAction.label);
                            setActiveIdx(null);
                          }}
                          className="w-full rounded-lg bg-blue-600 py-1.5 text-center font-bold text-white shadow-sm hover:bg-blue-700 transition"
                        >
                          {stepAction.label}
                        </button>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}

function RequestCard({ request, onAdvance, compact }) {
  return (
    <motion.div layout className="rounded-2xl border border-slate-100 bg-white p-4 text-left shadow-sm transition hover:border-blue-100 hover:shadow-md">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-semibold text-blue-600">{request.id} · {request.project}</p>
          <h3 className={`mt-1 font-semibold text-slate-900 truncate ${compact ? "text-sm" : "text-base"}`}>{request.title}</h3>
        </div>
        <Badge className={workflowStatusStyle[request.status] || "bg-slate-100 text-slate-600 ring-slate-200"}>{request.status}</Badge>
      </div>
      <p className="text-xs text-slate-500 mt-2 line-clamp-2">{request.description}</p>
      <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-500">
        <p className="flex items-center gap-1.5"><User className="h-3.5 w-3.5" /> Giao cho: <strong>{request.assignee}</strong></p>
        <p className="flex items-center gap-1.5"><CalendarDays className="h-3.5 w-3.5" /> Hạn: {request.due}</p>
      </div>
      <TimelineMini timeline={request.timeline} request={request} onAdvance={onAdvance} />
    </motion.div>
  );
}

function TransitionModal({ context, onClose, onSubmit }) {
  const { requestId, actionType } = context;
  const [form, setForm] = useState({
    assignee: "Tôi",
    notes: "",
    solution: "",
    decision: "Duyệt",
  });

  const isProposal = actionType === "Đề xuất giải pháp";
  const isSurvey = actionType === "Bắt đầu khảo sát";
  const isApproval = actionType === "Phê duyệt giải pháp";
  const isDeploy = actionType === "Bắt đầu triển khai";
  const isFinish = actionType === "Hoàn tất yêu cầu (Đóng)" || actionType === "Hoàn tất yêu cầu";

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(requestId, actionType, form);
  };

  const FieldLabel = ({ children, required = false }) => (
    <span className="block text-sm font-semibold text-slate-700 mb-1.5">{children}{required && <span className="ml-1 text-red-500">*</span>}</span>
  );

  const inputClass = "w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/45 p-4" onClick={onClose}>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md rounded-2xl bg-white shadow-2xl overflow-hidden font-sans"
      >
        <div className="border-b border-slate-100 px-5 py-4 bg-slate-50 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-slate-900">Cập nhật {requestId}</h3>
            <p className="text-xs text-slate-500 mt-0.5">Bước: {actionType}</p>
          </div>
          <button type="button" onClick={onClose} className="rounded-lg p-1.5 hover:bg-slate-200/60 text-slate-400 hover:text-slate-600"><X className="h-5 w-5" /></button>
        </div>

        <form onSubmit={handleSubmit} className="p-5 space-y-4">
          {isSurvey && (
            <label className="block">
              <FieldLabel required>Nội dung & Hiện trạng khảo sát</FieldLabel>
              <textarea
                required
                rows={4}
                value={form.notes}
                onChange={(e) => setForm(old => ({ ...old, notes: e.target.value }))}
                placeholder="Nhập ghi nhận hiện trạng lỗi, kết quả khảo sát thực tế..."
                className="w-full resize-none rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </label>
          )}

          {isProposal && (
            <label className="block">
              <FieldLabel required>Nội dung đề xuất giải pháp</FieldLabel>
              <textarea
                required
                rows={4}
                value={form.solution}
                onChange={(e) => setForm(old => ({ ...old, solution: e.target.value }))}
                placeholder="Nhập giải pháp kỹ thuật, phương án xử lý chi tiết tại đây..."
                className="w-full resize-none rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </label>
          )}

          {isApproval && (
            <>
              <label className="block">
                <FieldLabel required>Quyết định phê duyệt</FieldLabel>
                <select
                  value={form.decision}
                  onChange={(e) => setForm(old => ({ ...old, decision: e.target.value }))}
                  className={inputClass}
                >
                  <option value="Duyệt">Đồng ý phê duyệt (Chuyển sang triển khai)</option>
                  <option value="Từ chối">Từ chối / Yêu cầu khảo sát lại</option>
                </select>
              </label>
              <label className="block">
                <FieldLabel required>Ý kiến phê duyệt</FieldLabel>
                <textarea
                  required
                  rows={3}
                  value={form.notes}
                  onChange={(e) => setForm(old => ({ ...old, notes: e.target.value }))}
                  placeholder="Nhập ý kiến phê duyệt giải pháp hoặc lý do yêu cầu làm lại..."
                  className="w-full resize-none rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </label>
            </>
          )}

          {isDeploy && (
            <label className="block">
              <FieldLabel required>Kế hoạch & Phương án triển khai chi tiết</FieldLabel>
              <textarea
                required
                rows={4}
                value={form.notes}
                onChange={(e) => setForm(old => ({ ...old, notes: e.target.value }))}
                placeholder="Nhập phân công chi tiết, các bước triển khai..."
                className="w-full resize-none rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </label>
          )}

          {isFinish && (
            <label className="block">
              <FieldLabel required>Kết quả xử lý & Nghiệm thu</FieldLabel>
              <textarea
                required
                rows={4}
                value={form.notes}
                onChange={(e) => setForm(old => ({ ...old, notes: e.target.value }))}
                placeholder="Nhập chi tiết kết quả khắc phục sự cố, nghiệm thu..."
                className="w-full resize-none rounded-xl border border-slate-200 px-3 py-2.5 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
              />
            </label>
          )}

          {(isSurvey || isProposal || isDeploy) && (
            <label className="block">
              <FieldLabel required>{isProposal ? "Người phê duyệt giải pháp" : "Người chịu trách nhiệm xử lý tiếp theo"}</FieldLabel>
              <select
                value={form.assignee}
                onChange={(e) => setForm(old => ({ ...old, assignee: e.target.value }))}
                className={inputClass}
              >
                <option value="Tôi">Tôi (Phòng IT)</option>
                <option value="Trần Bình">Trần Bình</option>
                <option value="IT Helpdesk">IT Helpdesk</option>
                <option value="Phạm Duy">Phạm Duy</option>
              </select>
            </label>
          )}

          <div className="flex justify-end gap-2 border-t border-slate-100 pt-4 mt-5">
            <button type="button" onClick={onClose} className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 hover:bg-slate-50">Huỷ</button>
            <button
              type="submit"
              disabled={
                isSurvey ? !form.notes.trim() :
                isProposal ? !form.solution.trim() :
                isApproval ? !form.notes.trim() :
                isDeploy ? !form.notes.trim() :
                isFinish ? !form.notes.trim() : false
              }
              className="rounded-xl bg-blue-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm hover:bg-blue-700 disabled:opacity-40 disabled:pointer-events-none"
            >
              Gửi
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}

function ViewportFrame({ mode, children }) {
  const phone = mode === "mobile";
  return (
    <div className={`mx-auto overflow-hidden bg-slate-50 shadow-2xl transition-all duration-500 ${phone ? "h-[790px] w-[390px] rounded-[34px] border-[8px] border-slate-900" : "min-h-[600px] w-full max-w-[1260px] rounded-2xl border border-slate-200"}`}>
      {phone && (
        <div className="relative flex h-7 items-center justify-center bg-white border-b border-slate-50">
          <div className="h-1.5 w-20 rounded-full bg-slate-900" />
          <span className="absolute left-4 text-[10px] font-semibold text-slate-600 font-sans">09:41</span>
        </div>
      )}
      <div className={phone ? "relative h-[755px] overflow-y-auto" : "min-h-[600px] flex"}>
        {children}
      </div>
    </div>
  );
}

export default function App() {
  const [mode, setMode] = useState("desktop");
  const [requests, setRequests] = useState(initialRequests);
  const [transitionContext, setTransitionContext] = useState(null);

  const compact = mode === "mobile";

  function advanceStatus(id, actionLabel) {
    setTransitionContext({ requestId: id, actionType: actionLabel });
  }

  function handleTransitionSubmit(id, actionType, formData) {
    setRequests((old) =>
      old.map((request) => {
        if (request.id !== id) return request;

        const now = "25/05/2026 15:32";
        let newStatus = request.status;
        let newTimeline = [...request.timeline];
        let newAssignee = request.assignee;

        if (actionType === "Bắt đầu khảo sát") {
          newStatus = "Đang khảo sát";
          newAssignee = formData.assignee || request.assignee;
          newTimeline = newTimeline.map(step => {
            if (step.label === "Khảo sát") return { ...step, state: "active", time: `Bắt đầu ${now}`, comment: formData.notes, user: "IT Helpdesk" };
            return step;
          });
        } else if (actionType === "Đề xuất giải pháp") {
          newStatus = "Chờ phê duyệt";
          newAssignee = formData.assignee || request.assignee;
          newTimeline = newTimeline.map(step => {
            if (step.label === "Khảo sát") return { ...step, state: "done" };
            if (step.label === "Đề xuất giải pháp") return { ...step, state: "active", time: `Đề xuất: ${now}`, comment: formData.solution, user: "IT Helpdesk" };
            return step;
          });
        } else if (actionType === "Phê duyệt giải pháp") {
          const isApproved = formData.decision !== "Từ chối";
          if (isApproved) {
            newTimeline = newTimeline.map(step => {
              if (step.label === "Đề xuất giải pháp") return { ...step, state: "done" };
              if (step.label === "Phê duyệt giải pháp") return { ...step, state: "active", time: `Phê duyệt: ${now}`, comment: formData.notes, user: "Trần Bình" };
              return step;
            });
          } else {
            newStatus = "Đang khảo sát";
            newTimeline = newTimeline.map(step => {
              if (step.label === "Khảo sát") return { ...step, state: "active", time: `Yêu cầu làm lại: ${now}` };
              if (step.label === "Đề xuất giải pháp") return { ...step, state: "todo", comment: `Bị từ chối: ${formData.notes}`, user: "Trần Bình", time: "" };
              if (step.label === "Phê duyệt giải pháp") return { ...step, state: "todo", time: "" };
              return step;
            });
          }
        } else if (actionType === "Bắt đầu triển khai") {
          newStatus = "Đang triển khai";
          newAssignee = formData.assignee || request.assignee;
          newTimeline = newTimeline.map(step => {
            if (step.label === "Phê duyệt giải pháp") return { ...step, state: "done" };
            if (step.label === "Triển khai") return { ...step, state: "active", time: `Bắt đầu ${now}`, comment: formData.notes, user: request.assignee };
            return step;
          });
        } else if (actionType === "Hoàn tất yêu cầu (Đóng)" || actionType === "Hoàn tất yêu cầu") {
          newStatus = "Đã đóng";
          newTimeline = newTimeline.map(step => {
            if (step.label === "Triển khai") return { ...step, state: "done" };
            if (step.label === "Kết thúc") return { ...step, state: "done", time: now, comment: formData.notes, user: request.assignee };
            return step;
          });
        }

        return {
          ...request,
          status: newStatus,
          assignee: newAssignee,
          timeline: newTimeline,
        };
      })
    );
    setTransitionContext(null);
  }

  return (
    <div className="min-h-screen bg-slate-100 p-4 font-sans text-slate-900 sm:p-7">
      {/* Viewport mode switcher */}
      <div className="mx-auto mb-5 flex max-w-[1260px] items-center justify-between gap-3">
        <div>
          <h1 className="text-lg font-bold">Prototype Redmine Tối Giản</h1>
          <p className="text-sm text-slate-500">Chuyển trạng thái trực tiếp bằng cách click chấm tiến độ trên Card.</p>
        </div>
        <div className="flex rounded-xl border border-slate-200 bg-white p-1 shadow-sm shrink-0">
          <button
            onClick={() => setMode("desktop")}
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold ${mode === "desktop" ? "bg-blue-600 text-white" : "text-slate-500"}`}
          >
            <Monitor className="h-4 w-4" />
            <span className="hidden sm:inline">Máy tính</span>
          </button>
          <button
            onClick={() => setMode("mobile")}
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-semibold ${mode === "mobile" ? "bg-blue-600 text-white" : "text-slate-500"}`}
          >
            <Smartphone className="h-4 w-4" />
            <span className="hidden sm:inline">Điện thoại</span>
          </button>
        </div>
      </div>

      <ViewportFrame mode={mode}>
        {compact ? (
          /* Mobile Viewport */
          <div className="flex-1 flex flex-col bg-slate-50 min-h-full">
            <header className="border-b border-slate-100 bg-white px-4 py-4 shrink-0">
              <h1 className="text-lg font-bold text-slate-900">Quản lý yêu cầu (Mobile)</h1>
              <p className="text-[11px] text-slate-400 mt-0.5">Bấm chấm tròn tiến độ để chuyển trạng thái nhanh.</p>
            </header>
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {requests.map((request) => (
                <RequestCard key={request.id} request={request} onAdvance={advanceStatus} compact={true} />
              ))}
            </div>
          </div>
        ) : (
          /* Desktop Viewport */
          <>
            <aside className="w-64 shrink-0 flex flex-col border-r border-slate-100 bg-white p-5">
              <div className="mb-9 flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-600 text-white"><FolderKanban className="h-5 w-5" /></div>
                <div>
                  <p className="font-bold text-slate-900">Smart Request</p>
                  <p className="text-xs text-slate-400">Desktop view</p>
                </div>
              </div>
              <nav className="space-y-1.5 text-sm">
                <div className="flex items-center gap-3 rounded-xl bg-blue-50 px-3 py-3 font-semibold text-blue-700"><LayoutDashboard className="h-4 w-4" /> Danh sách yêu cầu</div>
              </nav>
            </aside>
            <main className="min-w-0 flex-1 bg-slate-50 flex flex-col">
              <header className="border-b border-slate-100 bg-white px-7 py-5">
                <h1 className="text-2xl font-bold text-slate-900">Quản lý yêu cầu (Desktop)</h1>
                <p className="mt-1 text-sm text-slate-500">Bấm nút tròn màu xám trên Card tiến độ của yêu cầu để cập nhật trạng thái.</p>
              </header>
              <div className="p-7 flex-1">
                <div className="grid gap-4 grid-cols-1 xl:grid-cols-2">
                  {requests.map((request) => (
                    <RequestCard key={request.id} request={request} onAdvance={advanceStatus} compact={false} />
                  ))}
                </div>
              </div>
            </main>
          </>
        )}
      </ViewportFrame>

      {transitionContext && (
        <TransitionModal 
          context={transitionContext} 
          onClose={() => setTransitionContext(null)} 
          onSubmit={handleTransitionSubmit} 
        />
      )}
    </div>
  );
}
