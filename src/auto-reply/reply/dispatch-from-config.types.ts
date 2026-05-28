import type { OpenClawConfig } from "../../config/types.openclaw.js";
import type { GetReplyOptions } from "../get-reply-options.types.js";
import type { FinalizedMsgContext } from "../templating.js";
import type { FormatAbortReplyText, TryFastAbortFromMessage } from "./abort.runtime-types.js";
import type { GetReplyFromConfig } from "./get-reply.types.js";
import type { ReplyDispatchKind, ReplyDispatcher } from "./reply-dispatcher.types.js";

export type DispatchFromConfigResult = {
  queuedFinal: boolean;
  counts: Record<ReplyDispatchKind, number>;
};

export type DispatchFromConfigParams = {
  ctx: FinalizedMsgContext;
  cfg: OpenClawConfig;
  dispatcher: ReplyDispatcher;
  replyOptions?: Omit<GetReplyOptions, "onBlockReply">;
  replyResolver?: GetReplyFromConfig;
  fastAbortResolver?: TryFastAbortFromMessage;
  formatAbortReplyTextResolver?: FormatAbortReplyText;
  /** Optional config override passed to getReplyFromConfig (e.g. per-sender timezone). */
  configOverride?: OpenClawConfig;
  /**
   * Provider-pass-through request metadata. Forwarded through the embedded
   * agent into the outbound Anthropic Messages `metadata` field so the
   * LiteLLM proxy (or any downstream observer) can correlate the call with
   * the caller's session context. Values are constrained to strings to
   * match the Anthropic Messages metadata shape; coerce non-string values
   * (e.g. numeric ids) to strings at the call site.
   */
  requestMetadata?: Record<string, string>;
};

export type DispatchReplyFromConfig = (
  params: DispatchFromConfigParams,
) => Promise<DispatchFromConfigResult>;
