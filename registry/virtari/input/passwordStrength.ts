export type PasswordStrengthScore = 0 | 1 | 2 | 3 | 4;

export type PasswordStrengthLevel =
  | "empty"
  | "weak"
  | "fair"
  | "good"
  | "strong";

export type PasswordStrengthColor =
  | "neutral"
  | "danger"
  | "warning"
  | "primary"
  | "success";

export type PasswordStrengthStandard = "basic" | "standard" | "strict";

export type PasswordRequirementId =
  | "min-length"
  | "recommended-length"
  | "mixed-case"
  | "number"
  | "symbol"
  | "no-common-pattern";

export type PasswordRequirementConfig =
  | PasswordRequirementId
  | {
      id: PasswordRequirementId;
      label?: string;
      enabled?: boolean;
    };

export interface PasswordStrengthRequirement {
  id: PasswordRequirementId;
  label: string;
  met: boolean;
}

export interface PasswordStrengthAnalysis {
  value: string;
  length: number;
  score: PasswordStrengthScore;
  percent: number;
  level: PasswordStrengthLevel;
  color: PasswordStrengthColor;
  label: string;
  feedback: string;
  isAcceptable: boolean;
  requirements: PasswordStrengthRequirement[];
}

export interface PasswordStrengthOptions {
  standard?: PasswordStrengthStandard;
  minLength?: number;
  strongLength?: number;
  forbiddenValues?: string[];
  userInputs?: string[];
  labels?: Partial<Record<PasswordStrengthLevel, string>>;
  feedback?: Partial<Record<PasswordStrengthLevel, string>>;
  requirementLabels?: Partial<Record<PasswordRequirementId, string>>;
  requirements?: PasswordRequirementConfig[];
}

const COMMON_PATTERNS = [
  "password",
  "passw0rd",
  "qwerty",
  "letmein",
  "welcome",
  "admin",
  "administrator",
  "login",
  "iloveyou",
  "secret",
  "default",
  "changeme",
  "virtari",
];

const SEQUENCES = [
  "0123456789",
  "abcdefghijklmnopqrstuvwxyz",
  "qwertyuiop",
  "asdfghjkl",
  "zxcvbnm",
];

const DEFAULT_LABELS: Record<PasswordStrengthLevel, string> = {
  empty: "Enter password",
  weak: "Weak",
  fair: "Fair",
  good: "Good",
  strong: "Strong",
};

const DEFAULT_FEEDBACK: Record<PasswordStrengthLevel, string> = {
  empty: "Enter a password.",
  weak: "Too weak.",
  fair: "Getting better.",
  good: "Good.",
  strong: "Strong.",
};

const DEFAULT_REQUIREMENTS: PasswordRequirementId[] = [
  "min-length",
  "recommended-length",
  "mixed-case",
  "number",
  "symbol",
  "no-common-pattern",
];

const PASSWORD_STANDARDS: Record<
  PasswordStrengthStandard,
  {
    minLength: number;
    strongLength: number;
    requirements: PasswordRequirementConfig[];
  }
> = {
  basic: {
    minLength: 8,
    strongLength: 12,
    requirements: ["min-length"],
  },
  standard: {
    minLength: 12,
    strongLength: 16,
    requirements: ["min-length", "symbol"],
  },
  strict: {
    minLength: 14,
    strongLength: 18,
    requirements: [
      "min-length",
      "mixed-case",
      "number",
      "symbol",
      "no-common-pattern",
    ],
  },
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function normalize(value: string) {
  return value.trim().toLowerCase();
}

function hasSequence(value: string) {
  if (value.length < 4) return false;

  return SEQUENCES.some((sequence) => {
    const reversed = Array.from(sequence).reverse().join("");

    for (let size = 4; size <= Math.min(6, sequence.length); size += 1) {
      for (let index = 0; index <= sequence.length - size; index += 1) {
        const part = sequence.slice(index, index + size);
        const reversePart = reversed.slice(index, index + size);
        if (value.includes(part) || value.includes(reversePart)) return true;
      }
    }

    return false;
  });
}

function hasLongRepeat(value: string) {
  return /(.)\1{2,}/.test(value);
}

function includesForbiddenValue(
  value: string,
  forbiddenValues: Array<string | undefined>,
) {
  return forbiddenValues.some((item) => {
    if (!item) return false;
    const normalized = normalize(item);
    return normalized.length >= 3 && value.includes(normalized);
  });
}

function getScore(percent: number, hasValue: boolean): PasswordStrengthScore {
  if (!hasValue) return 0;
  if (percent >= 84) return 4;
  if (percent >= 64) return 3;
  if (percent >= 40) return 2;
  return 1;
}

function getLevel(score: PasswordStrengthScore): PasswordStrengthLevel {
  if (score === 0) return "empty";
  if (score === 1) return "weak";
  if (score === 2) return "fair";
  if (score === 3) return "good";
  return "strong";
}

function getColor(level: PasswordStrengthLevel): PasswordStrengthColor {
  if (level === "empty") return "neutral";
  if (level === "weak") return "danger";
  if (level === "fair") return "warning";
  if (level === "good") return "primary";
  return "success";
}

function defaultRequirementLabel(
  id: PasswordRequirementId,
  minLength: number,
  strongLength: number,
) {
  switch (id) {
    case "min-length":
      return `At least ${minLength} characters`;
    case "recommended-length":
      return `At least ${strongLength} characters`;
    case "mixed-case":
      return "Uppercase and lowercase";
    case "number":
      return "At least one number";
    case "symbol":
      return "At least one special character";
    case "no-common-pattern":
      return "No common patterns";
    default:
      return "";
  }
}

function resolveRequirementConfigs(
  requirements: PasswordRequirementConfig[] | undefined,
  standardRequirements: PasswordRequirementConfig[] | undefined,
) {
  const source = requirements ?? standardRequirements ?? DEFAULT_REQUIREMENTS;
  const seen = new Set<PasswordRequirementId>();

  return source.flatMap((requirement) => {
    const config =
      typeof requirement === "string" ? { id: requirement } : requirement;

    if (config.enabled === false || seen.has(config.id)) return [];
    seen.add(config.id);

    return [config];
  });
}

export function analyzePasswordStrength(
  password: string,
  options: PasswordStrengthOptions = {},
): PasswordStrengthAnalysis {
  const value = password ?? "";
  const normalized = normalize(value);
  const length = Array.from(value).length;
  const standard = options.standard
    ? PASSWORD_STANDARDS[options.standard]
    : undefined;
  const minLength = options.minLength ?? standard?.minLength ?? 8;
  const strongLength = options.strongLength ?? standard?.strongLength ?? 12;
  const hasValue = length > 0;
  const hasLower = /[a-z]/.test(value);
  const hasUpper = /[A-Z]/.test(value);
  const hasDigit = /\d/.test(value);
  const hasSymbol = /[^A-Za-z0-9\s]/.test(value);
  const variety = [hasLower || hasUpper, hasDigit, hasSymbol].filter(
    Boolean,
  ).length;
  const obviousPattern =
    hasValue &&
    (hasLongRepeat(normalized) ||
      hasSequence(normalized) ||
      includesForbiddenValue(normalized, [
        ...COMMON_PATTERNS,
        ...(options.forbiddenValues ?? []),
        ...(options.userInputs ?? []),
      ]));

  const requirementLabels = options.requirementLabels ?? {};
  const requirementConfigs = resolveRequirementConfigs(
    options.requirements,
    standard?.requirements,
  );
  const requirements: PasswordStrengthRequirement[] = requirementConfigs.map(
    (config) => {
      const label =
        config.label ??
        requirementLabels[config.id] ??
        defaultRequirementLabel(config.id, minLength, strongLength);
      let met = false;

      switch (config.id) {
        case "min-length":
          met = length >= minLength;
          break;
        case "recommended-length":
          met = length >= strongLength;
          break;
        case "mixed-case":
          met = hasLower && hasUpper;
          break;
        case "number":
          met = hasDigit;
          break;
        case "symbol":
          met = hasSymbol;
          break;
        case "no-common-pattern":
          met = hasValue && !obviousPattern;
          break;
      }

      return { id: config.id, label, met };
    },
  );

  let points = 0;
  if (hasValue) {
    points += clamp(length * 2.4, 4, 30);
    if (length >= minLength) points += 16;
    if (length >= strongLength) points += 14;
    if (hasLower && hasUpper) points += 14;
    if (hasDigit) points += 12;
    if (hasSymbol) points += 14;
    if (variety >= 3) points += 8;
    if (!obviousPattern) points += 8;
    if (obviousPattern) points -= 24;
  }

  const rawPercent = clamp(Math.round(points), 0, 100);
  const percent = hasValue ? Math.max(rawPercent, 8) : 0;
  const score = getScore(percent, hasValue);
  const level = getLevel(score);
  const labels = { ...DEFAULT_LABELS, ...options.labels };
  const feedbackMap = { ...DEFAULT_FEEDBACK, ...options.feedback };
  const hasMinLengthRequirement = requirements.some(
    (requirement) => requirement.id === "min-length",
  );
  const hasNoCommonPatternRequirement = requirements.some(
    (requirement) => requirement.id === "no-common-pattern",
  );
  const feedback =
    hasValue && hasMinLengthRequirement && length < minLength
      ? `${minLength}+ characters.`
      : obviousPattern && hasNoCommonPatternRequirement
        ? "Avoid common patterns."
        : feedbackMap[level];

  return {
    value,
    length,
    score,
    percent,
    level,
    color: getColor(level),
    label: labels[level],
    feedback,
    isAcceptable:
      hasValue &&
      score >= 2 &&
      (requirements.length === 0 ||
        requirements.every((requirement) => requirement.met)),
    requirements,
  };
}

export function getPasswordStrength(
  password: string,
  options?: PasswordStrengthOptions,
): PasswordStrengthScore {
  return analyzePasswordStrength(password, options).score;
}
