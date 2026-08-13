/** Eye-care state owner: durable settings synchronization plus theme lifecycle. */
import type { ClientConnectionRpc } from '@deepseek-ai/dsh-client-connection/client';
import { type SnapshotStore } from '@deepseek-ai/dsh-client-runtime/client';
import type { ThemeRuntime, ThemeSnapshot } from '@deepseek-ai/dsh-client-ui-theme/client';
import { type EyeCareIntensity, type EyeCareMode, type EyeCareSettings } from '../shared.ts';
/** State consumed by the General-settings row. */
export interface EyeCareState {
    /** Current eye-care selection. */
    settings: EyeCareSettings;
    /** Persistence lifecycle. */
    status: 'loading' | 'ready' | 'saving' | 'unavailable' | 'error';
    /** Whether the Host settings document can be written. */
    writable: boolean;
    /** Host namespace revision for the next write. */
    revision: number | undefined;
    /** User-facing read or write failure, when one stands. */
    error: string | null;
}
/** Inputs isolated for deterministic controller tests. */
export interface EyeCareControllerOptions {
    /** DSH theme registry. */
    theme: Pick<ThemeRuntime, 'getTheme' | 'setTheme' | 'register'>;
    /** Snapshot change subscription. */
    subscribeTheme(listener: (snapshot: ThemeSnapshot) => void): () => void;
    /** Loopback-only Connection RPC; absent remote browsers stay process-local. */
    rpc?: ClientConnectionRpc;
    /** System dark-mode sensor. */
    media?: MediaQueryList;
    /** Monotonic wall-clock source used only by the one-shot startup adoption fence. */
    now?: () => number;
}
/** Stateful controller shared by theme listeners and the Settings row. */
export declare class EyeCareController {
    /** Reactive row source. */
    readonly store: SnapshotStore<EyeCareState>;
    private readonly theme;
    private readonly rpc;
    private readonly media;
    private readonly now;
    private readonly unregisterThemes;
    private unsubscribeTheme;
    private unsubscribeMedia;
    private tail;
    private disposeTask;
    private pendingSettings;
    private disposed;
    private applyingTheme;
    private restoreTheme;
    private hasRestoreTheme;
    private acceptedRemoteSnapshot;
    private startupBaseTheme;
    private startupBaseThemeDeadline;
    /**
     * Register the concrete themes and lifecycle listeners.
     * @param options - theme, transport, and system-scheme collaborators.
     */
    constructor(options: EyeCareControllerOptions);
    /**
     * Load durable settings without blocking plugin activation.
     * @returns settlement after this read reaches the serialized transport queue.
     */
    load(): Promise<void>;
    /**
     * Select a mode and persist the latest selection when Host settings are writable.
     * @param mode - next operating mode.
     * @returns settlement after the serialized persistence attempt.
     */
    setMode(mode: EyeCareMode): Promise<void>;
    /**
     * Select a warmth and persist the latest selection when Host settings are writable.
     * @param intensity - next warmth level.
     * @returns settlement after the serialized persistence attempt.
     */
    setIntensity(intensity: EyeCareIntensity): Promise<void>;
    /** Queue a refresh after a Host settings invalidation. */
    refresh(): void;
    /**
     * Reach transport quiescence, restore the user's live non-eye-care theme, and unregister all resources.
     * @returns settlement after cleanup completes.
     */
    dispose(): Promise<void>;
    private disposeOnce;
    private enqueue;
    private select;
    private persist;
    private flushPending;
    private readRemote;
    private accept;
    private setUnavailable;
    private captureRestoreTheme;
    private resolveRestoreTheme;
    private applyCurrentTheme;
    private setTheme;
    private onThemeChanged;
}
//# sourceMappingURL=controller.d.ts.map