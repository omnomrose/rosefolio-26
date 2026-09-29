// Icons exported from Figma as SVG. Colour comes from `currentColor`
// so states (default / hover / active) are driven by token classes.

type IconProps = { className?: string };

export function PrevIcon({ className }: IconProps) {
  return (
    <svg className={className} width="17" height="19" viewBox="0 0 17 19" fill="none" aria-hidden="true">
      <path d="M0.5 15.6013L0.500001 2.45021" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M15.2313 17.8801C15.7487 18.2886 16.5093 17.92 16.5093 17.2607L16.5093 0.790581C16.5093 0.131317 15.7487 -0.237177 15.2313 0.171295L4.80019 8.40639C4.4 8.72228 4.4 9.32907 4.80019 9.64496L15.2313 17.8801Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function NextIcon({ className }: IconProps) {
  return (
    <svg className={className} width="17" height="19" viewBox="0 0 17 19" fill="none" aria-hidden="true">
      <path
        d="M1.27801 0.171214C0.760555 -0.237299 0 0.131261 0 0.79054V17.2607C0 17.92 0.760555 18.2884 1.27801 17.88L11.7091 9.64488C12.1093 9.32899 12.1093 8.7222 11.7091 8.40631L1.27801 0.171214Z"
        fill="currentColor"
      />
      <path d="M16.0093 2.44995V15.6011" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PlayIcon({ className }: IconProps) {
  return (
    <svg className={className} width="15" height="18" viewBox="0 0 15 18" fill="none" aria-hidden="true">
      <path
        d="M1.05147 0.101048C0.587229 -0.18157 0 0.162169 0 0.716519V17.2835C0 17.8378 0.587229 18.1816 1.05147 17.899L14.6587 9.6155C15.1138 9.33839 15.1138 8.6616 14.6587 8.38449L1.05147 0.101048Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function PauseIcon({ className }: IconProps) {
  return (
    <svg className={className} width="15" height="18" viewBox="0 0 15 18" fill="none" aria-hidden="true">
      <path
        d="M0 17.2286V0.771428C0 0.345381 0.335787 0 0.75 0H4.25C4.66421 0 5 0.345381 5 0.771428V17.2286C5 17.6547 4.66421 18 4.25 18H0.75C0.335787 18 0 17.6547 0 17.2286Z"
        fill="currentColor"
      />
      <path
        d="M10 17.2286V0.771428C10 0.345381 10.3358 0 10.75 0H14.25C14.6642 0 15 0.345381 15 0.771428V17.2286C15 17.6547 14.6642 18 14.25 18H10.75C10.3358 18 10 17.6547 10 17.2286Z"
        fill="currentColor"
      />
    </svg>
  );
}

export function ArrowUpRightIcon({ className }: IconProps) {
  return (
    <svg className={className} width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
      <path
        d="M0.75 9.75L9.75 0.75M9.75 9.39L9.75 0.75L1.11 0.75"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function EyeIcon({ className }: IconProps) {
  return (
    <svg className={className} width="15" height="10" viewBox="0 0 15 10" fill="none" aria-hidden="true">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M0.178584 4.44431C2.21247 1.52887 4.84971 0 7.49187 0C10.5949 0 13.2679 2.02153 14.8448 4.45711L14.8456 4.45825C14.95 4.62052 15.0055 4.80942 15.0055 5.00239C15.0055 5.19504 14.9502 5.38362 14.8461 5.54571C13.2705 8.01262 10.6149 10.0039 7.49187 10.0039C4.33559 10.0039 1.73112 8.01671 0.159406 5.55694C0.0525427 5.39099 -0.00288349 5.19714 0.000115579 4.99976C0.00312231 4.80187 0.0647188 4.60931 0.177121 4.44642L0.178579 4.44431L0.178584 4.44431ZM1.00207 5.01499L1.00315 5.01667L1.00315 5.01667C2.45465 7.28877 4.781 9.00196 7.49187 9.00196C10.1724 9.00196 12.5489 7.28149 14.0021 5.00581L14.0031 5.00431C14.0034 5.00374 14.0036 5.00307 14.0036 5.00239C14.0036 5.00171 14.0034 5.00105 14.0031 5.00048L14.4243 4.72939L14.0038 5.00163C12.5451 2.74868 10.1488 1.00189 7.49187 1.00189C5.26242 1.00189 2.90248 2.2922 1.00207 5.01499ZM7.50282 3.00189C6.39828 3.00189 5.50287 3.8973 5.50287 5.00185C5.50287 6.10639 6.39828 7.0018 7.50282 7.0018C8.60737 7.0018 9.50278 6.10639 9.50278 5.00185C9.50278 3.8973 8.60737 3.00189 7.50282 3.00189ZM4.50098 5.00185C4.50098 3.34397 5.84495 2 7.50282 2C9.1607 2 10.5047 3.34397 10.5047 5.00185C10.5047 6.65972 9.1607 8.00369 7.50282 8.00369C5.84495 8.00369 4.50098 6.65972 4.50098 5.00185Z"
        fill="currentColor"
      />
    </svg>
  );
}
