/**
 * UI-кит редизайна 6.0.0 — точные метрики из утверждённого макета
 * (Ops Dark / Clean Light). Все страницы админки собираются ИЗ ЭТИХ блоков,
 * чтобы вид был одинаковым и совпадал с макетом до пикселя.
 *
 * Соответствие макету:
 *   PageHead   .ph      (h2 20px/800, подзаголовок 12.5px)
 *   Kpis       .kpis    (4 колонки, значение 23px/800)
 *   Panel      .card    (паддинг 15/17, заголовок 13.5px/700)
 *   DataTable  .tbl     (th 10.5px uppercase, td 12.7px)
 *   Pill       .pill    (10.5px/700, радиус 99)
 *   Gauge      .gauge   (полоса 6px)
 */
import * as React from "react";
import { cn } from "@/lib/utils";

/*  кнопка страницы  */
export function KitBtn({
  children, primary, danger, onClick, className, disabled, title,
}: {
  children: React.ReactNode; primary?: boolean; danger?: boolean;
  onClick?: () => void; className?: string; disabled?: boolean; title?: string;
}) {
  return (
    <button
      type="button" onClick={onClick} disabled={disabled} title={title}
      className={cn(
        "text-[12.5px] font-semibold px-[13px] py-[7px] rounded-lg border transition-colors disabled:opacity-50",
        primary
          ? "bg-primary border-primary text-primary-foreground hover:bg-primary/90"
          : danger
          ? "bg-transparent border-destructive/45 text-destructive hover:bg-destructive/10"
          : "bg-card border-border text-foreground hover:bg-muted",
        className,
      )}
    >
      {children}
    </button>
  );
}

/*  шапка страницы  */
export function PageHead({
  title, subtitle, actions,
}: { title: string; subtitle?: string; actions?: React.ReactNode }) {
  return (
    <div className="flex items-start gap-3">
      <div className="min-w-0">
        <h2 className="text-xl font-extrabold tracking-[-0.3px] text-foreground">{title}</h2>
        {subtitle ? <p className="text-[12.5px] text-muted-foreground mt-[3px]">{subtitle}</p> : null}
      </div>
      {actions ? <div className="ml-auto flex gap-2 shrink-0">{actions}</div> : null}
    </div>
  );
}

/*  KPI-плитки  */
export type KpiItem = { label: string; value: React.ReactNode; sub?: React.ReactNode; brand?: boolean };
export function Kpis({ items, cols = 4 }: { items: KpiItem[]; cols?: 2 | 3 | 4 }) {
  return (
    <div className={cn("grid gap-3", cols === 2 ? "grid-cols-1 sm:grid-cols-2" : cols === 3 ? "grid-cols-2 lg:grid-cols-3" : "grid-cols-2 lg:grid-cols-4")}>
      {items.map((k, i) => (
        <div key={i} className="bg-card border border-border rounded-xl px-[15px] py-[13px]">
          <div className="text-[11px] font-semibold uppercase tracking-[0.5px] text-muted-foreground">{k.label}</div>
          <div className={cn("text-[23px] font-extrabold tracking-[-0.4px] mt-[5px] tabular-nums", k.brand && "text-primary")}>{k.value}</div>
          {k.sub ? <div className="text-[11.5px] text-emerald-500 mt-[3px]">{k.sub}</div> : null}
        </div>
      ))}
    </div>
  );
}

/*  карточка-панель  */
export function Panel({
  title, right, children, className, bodyClassName,
}: { title?: React.ReactNode; right?: React.ReactNode; children: React.ReactNode; className?: string; bodyClassName?: string }) {
  return (
    <div className={cn("bg-card border border-border rounded-xl px-[17px] py-[15px]", className)}>
      {title ? (
        <div className="text-[13.5px] font-bold mb-3 flex items-center gap-2">
          {title}
          {right ? <span className="ml-auto text-[11.5px] font-semibold text-primary">{right}</span> : null}
        </div>
      ) : null}
      <div className={bodyClassName}>{children}</div>
    </div>
  );
}

/*  статус-пилюля  */
export function Pill({ tone = "n", children }: { tone?: "ok" | "wa" | "er" | "n"; children: React.ReactNode }) {
  const map = {
    ok: "bg-emerald-500/15 text-emerald-500",
    wa: "bg-amber-500/15 text-amber-500",
    er: "bg-red-500/15 text-red-500",
    n: "bg-muted text-muted-foreground",
  };
  return <span className={cn("text-[10.5px] font-bold px-2 py-[2px] rounded-full inline-block", map[tone])}>{children}</span>;
}

/*  таблица  */
export function DataTable({
  cols, rows, empty = "Нет данных", onRowClick,
}: { cols: React.ReactNode[]; rows: React.ReactNode[][]; empty?: string; onRowClick?: (i: number) => void }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse text-[12.7px]">
        <thead>
          <tr>
            {cols.map((c, i) => (
              <th key={i} className="text-left text-[10.5px] font-bold uppercase tracking-[0.7px] text-muted-foreground px-[9px] pb-2 whitespace-nowrap">{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.length === 0 ? (
            <tr><td colSpan={cols.length} className="px-[9px] py-8 text-center text-muted-foreground border-t border-border">{empty}</td></tr>
          ) : rows.map((r, ri) => (
            <tr key={ri} onClick={onRowClick ? () => onRowClick(ri) : undefined} className={cn(onRowClick && "cursor-pointer hover:bg-muted/60")}>
              {r.map((c, ci) => (
                <td key={ci} className={cn("px-[9px] py-2 border-t border-border align-middle",
                  ci === 0 ? "text-foreground font-semibold" : "text-muted-foreground")}>{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/*  гейдж (диск/память)  */
export function Gauge({ label, pct, extra }: { label: string; pct: number; extra?: string }) {
  const p = Math.max(0, Math.min(100, pct));
  const tone = p >= 85 ? "bg-red-500" : p >= 70 ? "bg-amber-500" : "bg-emerald-500";
  const txt = p >= 85 ? "text-red-500" : p >= 70 ? "text-amber-500" : "text-emerald-500";
  return (
    <div className="mb-3 last:mb-0">
      <div className="text-[12.5px] text-muted-foreground">
        {label} <b className={cn("font-bold", txt)}>{p.toFixed(0)}%</b>
      </div>
      <div className="h-1.5 rounded-full bg-muted mt-1.5 overflow-hidden">
        <div className={cn("h-full", tone)} style={{ width: `${p}%` }} />
      </div>
      {extra ? <div className="text-[11.5px] text-muted-foreground/80 mt-1">{extra}</div> : null}
    </div>
  );
}

/*  строка «ключ: значение»  */
export function KV({ k, v, tone }: { k: string; v: React.ReactNode; tone?: "ok" | "wa" | "er" }) {
  const c = tone === "ok" ? "text-emerald-500" : tone === "wa" ? "text-amber-500" : tone === "er" ? "text-red-500" : "text-foreground";
  return (
    <div className="flex gap-2 text-[12.7px] border-b border-dashed border-border pb-[7px]">
      <span className="text-muted-foreground">{k}</span>
      <b className={cn("ml-auto font-semibold tabular-nums", c)}>{v}</b>
    </div>
  );
}

/*  строка службы (health)  */
export function HealthRow({ name, status, meta }: { name: string; status: "ok" | "wa" | "er"; meta?: React.ReactNode }) {
  const dot = status === "ok" ? "bg-emerald-500" : status === "wa" ? "bg-amber-500" : "bg-red-500";
  return (
    <div className="flex items-center gap-2.5 text-[12.7px] text-muted-foreground">
      <span className={cn("h-[7px] w-[7px] rounded-full shrink-0", dot)} />
      <span className="text-foreground">{name}</span>
      {meta ? <span className="ml-auto text-[11px] text-muted-foreground/70 tabular-nums">{meta}</span> : null}
    </div>
  );
}

/*  сетка формы  */
export function FormGrid({ children, cols = 2 }: { children: React.ReactNode; cols?: 1 | 2 }) {
  return <div className={cn("grid gap-3.5", cols === 1 ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2")}>{children}</div>;
}
export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-[12px] font-semibold text-muted-foreground">{label}</label>
      {children}
    </div>
  );
}

/*  строка-тумблер  */
export function ToggleRow({
  title, desc, checked, onChange,
}: { title: string; desc?: string; checked: boolean; onChange?: (v: boolean) => void }) {
  return (
    <div className="flex items-center gap-2.5 py-2.5 border-t border-border first:border-t-0">
      <div className="min-w-0">
        <div className="text-[13px] font-semibold">{title}</div>
        {desc ? <div className="text-[11.5px] text-muted-foreground mt-0.5">{desc}</div> : null}
      </div>
      <button
        type="button" onClick={() => onChange?.(!checked)}
        className={cn("ml-auto w-[38px] h-[21px] rounded-full border relative shrink-0 transition-colors",
          checked ? "bg-primary border-primary" : "bg-muted border-border")}
      >
        <span className={cn("absolute top-[2px] h-[15px] w-[15px] rounded-full transition-all",
          checked ? "right-[3px] bg-white" : "left-[3px] bg-muted-foreground/70")} />
      </button>
    </div>
  );
}

/*  обёртка страницы: вертикальный ритм как в макете  */
export function PageBody({ children }: { children: React.ReactNode }) {
  return <div className="flex flex-col gap-3.5">{children}</div>;
}
