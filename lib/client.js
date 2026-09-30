window.__ModuleLoader__.load({
	id: "@anionex/dsh-eye-care",
	factory: (require) => {
		var module = { exports: {} };
		var exports = module.exports;
		Object.defineProperty(exports, Symbol.toStringTag, { value: "Module" });
		let react_jsx_runtime = require("react/jsx-runtime");
		//#region \0dsh-eye-care-css:/Users/davidyang/dsh-worktrees/dsh-eye-care/compat-20261001/src/client/EyeCareRow.module.css.mjs
		const css = "._5STowG_row{border-bottom:1px solid var(--dsw-alias-border-l2);grid-template-columns:minmax(170px,.8fr) minmax(360px,1.2fr);gap:20px;padding:16px 0;display:grid}._5STowG_copy{min-width:0}._5STowG_title{color:var(--dsw-alias-label-primary);margin:0;font-size:14px;font-weight:500;line-height:22px}._5STowG_description{color:var(--dsw-alias-label-tertiary);margin:4px 0 0;font-size:12px;line-height:18px}._5STowG_controls{align-content:start;gap:8px;display:grid}._5STowG_controlGroup{flex-wrap:wrap;gap:6px;display:flex}._5STowG_option,._5STowG_smallOption{border:1px solid var(--dsw-alias-border-l2);background:var(--dsw-alias-bg-layer-1);color:var(--dsw-alias-label-secondary);font:inherit;cursor:pointer}._5STowG_option:focus-visible,._5STowG_smallOption:focus-visible{outline:2px solid var(--dsw-alias-button-info-fill);outline-offset:2px}._5STowG_option{border-radius:9px;min-width:68px;padding:7px 11px;font-size:12px;line-height:18px}._5STowG_smallOption{border-radius:7px;padding:4px 9px;font-size:11px;line-height:16px}._5STowG_option:hover:not(:disabled),._5STowG_smallOption:hover:not(:disabled){background:var(--dsw-alias-interactive-bg-hover-solid)}._5STowG_selected{border-color:var(--dsw-alias-button-info-fill);background:var(--dsw-alias-interactive-bg-active);color:var(--dsw-alias-label-primary)}._5STowG_option:disabled,._5STowG_smallOption:disabled{cursor:wait;opacity:.65}._5STowG_primaryLine,._5STowG_settingLine{flex-wrap:wrap;align-items:center;gap:8px;display:flex}._5STowG_settingLabel,._5STowG_status{color:var(--dsw-alias-label-tertiary);font-size:11px;line-height:16px}._5STowG_settingLabel{min-width:56px}._5STowG_advanced{border:1px solid var(--dsw-alias-border-l2);border-radius:9px;overflow:hidden}._5STowG_advanced>summary{color:var(--dsw-alias-label-secondary);cursor:pointer;padding:8px 10px;font-size:11px;line-height:16px}._5STowG_advancedBody{gap:8px;padding:0 10px 10px;display:grid}._5STowG_status{min-height:16px}@media (width<=640px){._5STowG_row{grid-template-columns:1fr;gap:10px}}";
		const tagId = "@anionex/dsh-eye-care/EyeCareRow.module.css";
		if (typeof document !== "undefined" && document.querySelector(`style[data-plugin-css=${JSON.stringify(tagId)}]`) === null) {
			const tag = document.createElement("style");
			tag.dataset.plugin = "@anionex/dsh-eye-care";
			tag.dataset.pluginCss = tagId;
			tag.textContent = css;
			document.head.appendChild(tag);
		}
		var EyeCareRow_module_css_default = {
			"description": "_5STowG_description",
			"advancedBody": "_5STowG_advancedBody",
			"selected": "_5STowG_selected",
			"primaryLine": "_5STowG_primaryLine",
			"copy": "_5STowG_copy",
			"title": "_5STowG_title",
			"option": "_5STowG_option",
			"settingLine": "_5STowG_settingLine",
			"settingLabel": "_5STowG_settingLabel",
			"controls": "_5STowG_controls",
			"status": "_5STowG_status",
			"smallOption": "_5STowG_smallOption",
			"row": "_5STowG_row",
			"controlGroup": "_5STowG_controlGroup",
			"advanced": "_5STowG_advanced"
		};
		//#endregion
		//#region src/client/EyeCareRow.tsx
		const MODES = [
			{
				id: "off",
				label: "mode.off"
			},
			{
				id: "auto",
				label: "mode.auto"
			},
			{
				id: "light",
				label: "mode.light"
			},
			{
				id: "dark",
				label: "mode.dark"
			}
		];
		const INTENSITIES = [
			{
				id: "soft",
				label: "intensity.soft"
			},
			{
				id: "balanced",
				label: "intensity.balanced"
			},
			{
				id: "warm",
				label: "intensity.warm"
			}
		];
		function statusKey(mode) {
			return `status.${mode}`;
		}
		/** Render the feature-owned General settings row. */
		function EyeCareRow({ t, useEyeCare, setMode, setIntensity }) {
			const state = useEyeCare((value) => value);
			const busy = state.status === "loading" || state.status === "saving";
			const enabled = state.settings.mode !== "off";
			const status = state.status === "error" && state.error !== null ? state.error : t(statusKey(state.settings.mode));
			const statusText = state.status === "unavailable" ? `${status} · ${t("status.local")}` : status;
			return /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("section", {
				className: EyeCareRow_module_css_default.row,
				"aria-labelledby": "dsh-eye-care-title",
				children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: EyeCareRow_module_css_default.copy,
					children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("h3", {
						id: "dsh-eye-care-title",
						className: EyeCareRow_module_css_default.title,
						children: t("title")
					}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("p", {
						className: EyeCareRow_module_css_default.description,
						children: t("description")
					})]
				}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
					className: EyeCareRow_module_css_default.controls,
					children: [
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: EyeCareRow_module_css_default.primaryLine,
							children: /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: EyeCareRow_module_css_default.controlGroup,
								role: "group",
								"aria-label": t("enabled.title"),
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
									type: "button",
									className: `${EyeCareRow_module_css_default.option}${!enabled ? ` ${EyeCareRow_module_css_default.selected}` : ""}`,
									"aria-pressed": !enabled,
									disabled: busy,
									onClick: () => {
										setMode("off");
									},
									children: t("enabled.off")
								}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
									type: "button",
									className: `${EyeCareRow_module_css_default.option}${enabled ? ` ${EyeCareRow_module_css_default.selected}` : ""}`,
									"aria-pressed": enabled,
									disabled: busy,
									onClick: () => {
										setMode(state.settings.mode === "off" ? "auto" : state.settings.mode);
									},
									children: t("enabled.on")
								})]
							})
						}),
						enabled ? /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("details", {
							className: EyeCareRow_module_css_default.advanced,
							children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("summary", { children: t("advanced.title") }), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
								className: EyeCareRow_module_css_default.advancedBody,
								children: [/* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: EyeCareRow_module_css_default.settingLine,
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
										className: EyeCareRow_module_css_default.settingLabel,
										children: t("mode.title")
									}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
										className: EyeCareRow_module_css_default.controlGroup,
										role: "group",
										"aria-label": t("mode.title"),
										children: MODES.filter(({ id }) => id !== "off").map(({ id, label }) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
											type: "button",
											className: `${EyeCareRow_module_css_default.smallOption}${state.settings.mode === id ? ` ${EyeCareRow_module_css_default.selected}` : ""}`,
											"aria-pressed": state.settings.mode === id,
											disabled: busy,
											onClick: () => {
												setMode(id);
											},
											children: t(label)
										}, id))
									})]
								}), /* @__PURE__ */ (0, react_jsx_runtime.jsxs)("div", {
									className: EyeCareRow_module_css_default.settingLine,
									children: [/* @__PURE__ */ (0, react_jsx_runtime.jsx)("span", {
										className: EyeCareRow_module_css_default.settingLabel,
										children: t("intensity.title")
									}), /* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
										className: EyeCareRow_module_css_default.controlGroup,
										role: "group",
										"aria-label": t("intensity.title"),
										children: INTENSITIES.map(({ id, label }) => /* @__PURE__ */ (0, react_jsx_runtime.jsx)("button", {
											type: "button",
											className: `${EyeCareRow_module_css_default.smallOption}${state.settings.intensity === id ? ` ${EyeCareRow_module_css_default.selected}` : ""}`,
											"aria-pressed": state.settings.intensity === id,
											disabled: busy,
											onClick: () => {
												setIntensity(id);
											},
											children: t(label)
										}, id))
									})]
								})]
							})]
						}) : null,
						/* @__PURE__ */ (0, react_jsx_runtime.jsx)("div", {
							className: EyeCareRow_module_css_default.status,
							"aria-live": "polite",
							children: state.status === "saving" ? t("status.saving") : statusText
						})
					]
				})]
			});
		}
		//#endregion
		//#region node_modules/.pnpm/zustand@4.4.7_@types+react@18.3.31_immer@10.1.1_react@18.3.1/node_modules/zustand/esm/vanilla.mjs
		const createStoreImpl = (createState) => {
			let state;
			const listeners = /* @__PURE__ */ new Set();
			const setState = (partial, replace) => {
				const nextState = typeof partial === "function" ? partial(state) : partial;
				if (!Object.is(nextState, state)) {
					const previousState = state;
					state = (replace != null ? replace : typeof nextState !== "object" || nextState === null) ? nextState : Object.assign({}, state, nextState);
					listeners.forEach((listener) => listener(state, previousState));
				}
			};
			const getState = () => state;
			const subscribe = (listener) => {
				listeners.add(listener);
				return () => listeners.delete(listener);
			};
			const destroy = () => {
				if (({}.env ? "production" : void 0) !== "production") console.warn("[DEPRECATED] The `destroy` method will be unsupported in a future version. Instead use unsubscribe function returned by subscribe. Everything will be garbage-collected if store is garbage-collected.");
				listeners.clear();
			};
			const api = {
				setState,
				getState,
				subscribe,
				destroy
			};
			state = createState(setState, getState, api);
			return api;
		};
		const createStore = (createState) => createState ? createStoreImpl(createState) : createStoreImpl;
		//#endregion
		//#region node_modules/.pnpm/zustand@4.4.7_@types+react@18.3.31_immer@10.1.1_react@18.3.1/node_modules/zustand/esm/middleware.mjs
		const subscribeWithSelectorImpl = (fn) => (set, get, api) => {
			const origSubscribe = api.subscribe;
			api.subscribe = (selector, optListener, options) => {
				let listener = selector;
				if (optListener) {
					const equalityFn = (options == null ? void 0 : options.equalityFn) || Object.is;
					let currentSlice = selector(api.getState());
					listener = (state) => {
						const nextSlice = selector(state);
						if (!equalityFn(currentSlice, nextSlice)) {
							const previousSlice = currentSlice;
							optListener(currentSlice = nextSlice, previousSlice);
						}
					};
					if (options == null ? void 0 : options.fireImmediately) optListener(currentSlice, currentSlice);
				}
				return origSubscribe(listener);
			};
			return fn(set, get, api);
		};
		const subscribeWithSelector = subscribeWithSelectorImpl;
		//#endregion
		//#region node_modules/.pnpm/immer@10.1.1/node_modules/immer/dist/immer.mjs
		var NOTHING = Symbol.for("immer-nothing");
		var DRAFTABLE = Symbol.for("immer-draftable");
		var DRAFT_STATE = Symbol.for("immer-state");
		function die(error, ...args) {
			throw new Error(`[Immer] minified error nr: ${error}. Full error at: https://bit.ly/3cXEKWf`);
		}
		var getPrototypeOf = Object.getPrototypeOf;
		function isDraft(value) {
			return !!value && !!value[DRAFT_STATE];
		}
		function isDraftable(value) {
			if (!value) return false;
			return isPlainObject(value) || Array.isArray(value) || !!value[DRAFTABLE] || !!value.constructor?.[DRAFTABLE] || isMap(value) || isSet(value);
		}
		var objectCtorString = Object.prototype.constructor.toString();
		function isPlainObject(value) {
			if (!value || typeof value !== "object") return false;
			const proto = getPrototypeOf(value);
			if (proto === null) return true;
			const Ctor = Object.hasOwnProperty.call(proto, "constructor") && proto.constructor;
			if (Ctor === Object) return true;
			return typeof Ctor == "function" && Function.toString.call(Ctor) === objectCtorString;
		}
		function each(obj, iter) {
			if (getArchtype(obj) === 0) Reflect.ownKeys(obj).forEach((key) => {
				iter(key, obj[key], obj);
			});
			else obj.forEach((entry, index) => iter(index, entry, obj));
		}
		function getArchtype(thing) {
			const state = thing[DRAFT_STATE];
			return state ? state.type_ : Array.isArray(thing) ? 1 : isMap(thing) ? 2 : isSet(thing) ? 3 : 0;
		}
		function has(thing, prop) {
			return getArchtype(thing) === 2 ? thing.has(prop) : Object.prototype.hasOwnProperty.call(thing, prop);
		}
		function set(thing, propOrOldValue, value) {
			const t = getArchtype(thing);
			if (t === 2) thing.set(propOrOldValue, value);
			else if (t === 3) thing.add(value);
			else thing[propOrOldValue] = value;
		}
		function is(x, y) {
			if (x === y) return x !== 0 || 1 / x === 1 / y;
			else return x !== x && y !== y;
		}
		function isMap(target) {
			return target instanceof Map;
		}
		function isSet(target) {
			return target instanceof Set;
		}
		function latest(state) {
			return state.copy_ || state.base_;
		}
		function shallowCopy(base, strict) {
			if (isMap(base)) return new Map(base);
			if (isSet(base)) return new Set(base);
			if (Array.isArray(base)) return Array.prototype.slice.call(base);
			const isPlain = isPlainObject(base);
			if (strict === true || strict === "class_only" && !isPlain) {
				const descriptors = Object.getOwnPropertyDescriptors(base);
				delete descriptors[DRAFT_STATE];
				let keys = Reflect.ownKeys(descriptors);
				for (let i = 0; i < keys.length; i++) {
					const key = keys[i];
					const desc = descriptors[key];
					if (desc.writable === false) {
						desc.writable = true;
						desc.configurable = true;
					}
					if (desc.get || desc.set) descriptors[key] = {
						configurable: true,
						writable: true,
						enumerable: desc.enumerable,
						value: base[key]
					};
				}
				return Object.create(getPrototypeOf(base), descriptors);
			} else {
				const proto = getPrototypeOf(base);
				if (proto !== null && isPlain) return { ...base };
				const obj = Object.create(proto);
				return Object.assign(obj, base);
			}
		}
		function freeze(obj, deep = false) {
			if (isFrozen(obj) || isDraft(obj) || !isDraftable(obj)) return obj;
			if (getArchtype(obj) > 1) obj.set = obj.add = obj.clear = obj.delete = dontMutateFrozenCollections;
			Object.freeze(obj);
			if (deep) Object.entries(obj).forEach(([key, value]) => freeze(value, true));
			return obj;
		}
		function dontMutateFrozenCollections() {
			die(2);
		}
		function isFrozen(obj) {
			return Object.isFrozen(obj);
		}
		var plugins = {};
		function getPlugin(pluginKey) {
			const plugin = plugins[pluginKey];
			if (!plugin) die(0, pluginKey);
			return plugin;
		}
		var currentScope;
		function getCurrentScope() {
			return currentScope;
		}
		function createScope(parent_, immer_) {
			return {
				drafts_: [],
				parent_,
				immer_,
				canAutoFreeze_: true,
				unfinalizedDrafts_: 0
			};
		}
		function usePatchesInScope(scope, patchListener) {
			if (patchListener) {
				getPlugin("Patches");
				scope.patches_ = [];
				scope.inversePatches_ = [];
				scope.patchListener_ = patchListener;
			}
		}
		function revokeScope(scope) {
			leaveScope(scope);
			scope.drafts_.forEach(revokeDraft);
			scope.drafts_ = null;
		}
		function leaveScope(scope) {
			if (scope === currentScope) currentScope = scope.parent_;
		}
		function enterScope(immer2) {
			return currentScope = createScope(currentScope, immer2);
		}
		function revokeDraft(draft) {
			const state = draft[DRAFT_STATE];
			if (state.type_ === 0 || state.type_ === 1) state.revoke_();
			else state.revoked_ = true;
		}
		function processResult(result, scope) {
			scope.unfinalizedDrafts_ = scope.drafts_.length;
			const baseDraft = scope.drafts_[0];
			if (result !== void 0 && result !== baseDraft) {
				if (baseDraft[DRAFT_STATE].modified_) {
					revokeScope(scope);
					die(4);
				}
				if (isDraftable(result)) {
					result = finalize(scope, result);
					if (!scope.parent_) maybeFreeze(scope, result);
				}
				if (scope.patches_) getPlugin("Patches").generateReplacementPatches_(baseDraft[DRAFT_STATE].base_, result, scope.patches_, scope.inversePatches_);
			} else result = finalize(scope, baseDraft, []);
			revokeScope(scope);
			if (scope.patches_) scope.patchListener_(scope.patches_, scope.inversePatches_);
			return result !== NOTHING ? result : void 0;
		}
		function finalize(rootScope, value, path) {
			if (isFrozen(value)) return value;
			const state = value[DRAFT_STATE];
			if (!state) {
				each(value, (key, childValue) => finalizeProperty(rootScope, state, value, key, childValue, path));
				return value;
			}
			if (state.scope_ !== rootScope) return value;
			if (!state.modified_) {
				maybeFreeze(rootScope, state.base_, true);
				return state.base_;
			}
			if (!state.finalized_) {
				state.finalized_ = true;
				state.scope_.unfinalizedDrafts_--;
				const result = state.copy_;
				let resultEach = result;
				let isSet2 = false;
				if (state.type_ === 3) {
					resultEach = new Set(result);
					result.clear();
					isSet2 = true;
				}
				each(resultEach, (key, childValue) => finalizeProperty(rootScope, state, result, key, childValue, path, isSet2));
				maybeFreeze(rootScope, result, false);
				if (path && rootScope.patches_) getPlugin("Patches").generatePatches_(state, path, rootScope.patches_, rootScope.inversePatches_);
			}
			return state.copy_;
		}
		function finalizeProperty(rootScope, parentState, targetObject, prop, childValue, rootPath, targetIsSet) {
			if (isDraft(childValue)) {
				const res = finalize(rootScope, childValue, rootPath && parentState && parentState.type_ !== 3 && !has(parentState.assigned_, prop) ? rootPath.concat(prop) : void 0);
				set(targetObject, prop, res);
				if (isDraft(res)) rootScope.canAutoFreeze_ = false;
				else return;
			} else if (targetIsSet) targetObject.add(childValue);
			if (isDraftable(childValue) && !isFrozen(childValue)) {
				if (!rootScope.immer_.autoFreeze_ && rootScope.unfinalizedDrafts_ < 1) return;
				finalize(rootScope, childValue);
				if ((!parentState || !parentState.scope_.parent_) && typeof prop !== "symbol" && Object.prototype.propertyIsEnumerable.call(targetObject, prop)) maybeFreeze(rootScope, childValue);
			}
		}
		function maybeFreeze(scope, value, deep = false) {
			if (!scope.parent_ && scope.immer_.autoFreeze_ && scope.canAutoFreeze_) freeze(value, deep);
		}
		function createProxyProxy(base, parent) {
			const isArray = Array.isArray(base);
			const state = {
				type_: isArray ? 1 : 0,
				scope_: parent ? parent.scope_ : getCurrentScope(),
				modified_: false,
				finalized_: false,
				assigned_: {},
				parent_: parent,
				base_: base,
				draft_: null,
				copy_: null,
				revoke_: null,
				isManual_: false
			};
			let target = state;
			let traps = objectTraps;
			if (isArray) {
				target = [state];
				traps = arrayTraps;
			}
			const { revoke, proxy } = Proxy.revocable(target, traps);
			state.draft_ = proxy;
			state.revoke_ = revoke;
			return proxy;
		}
		var objectTraps = {
			get(state, prop) {
				if (prop === DRAFT_STATE) return state;
				const source = latest(state);
				if (!has(source, prop)) return readPropFromProto(state, source, prop);
				const value = source[prop];
				if (state.finalized_ || !isDraftable(value)) return value;
				if (value === peek(state.base_, prop)) {
					prepareCopy(state);
					return state.copy_[prop] = createProxy(value, state);
				}
				return value;
			},
			has(state, prop) {
				return prop in latest(state);
			},
			ownKeys(state) {
				return Reflect.ownKeys(latest(state));
			},
			set(state, prop, value) {
				const desc = getDescriptorFromProto(latest(state), prop);
				if (desc?.set) {
					desc.set.call(state.draft_, value);
					return true;
				}
				if (!state.modified_) {
					const current2 = peek(latest(state), prop);
					const currentState = current2?.[DRAFT_STATE];
					if (currentState && currentState.base_ === value) {
						state.copy_[prop] = value;
						state.assigned_[prop] = false;
						return true;
					}
					if (is(value, current2) && (value !== void 0 || has(state.base_, prop))) return true;
					prepareCopy(state);
					markChanged(state);
				}
				if (state.copy_[prop] === value && (value !== void 0 || prop in state.copy_) || Number.isNaN(value) && Number.isNaN(state.copy_[prop])) return true;
				state.copy_[prop] = value;
				state.assigned_[prop] = true;
				return true;
			},
			deleteProperty(state, prop) {
				if (peek(state.base_, prop) !== void 0 || prop in state.base_) {
					state.assigned_[prop] = false;
					prepareCopy(state);
					markChanged(state);
				} else delete state.assigned_[prop];
				if (state.copy_) delete state.copy_[prop];
				return true;
			},
			getOwnPropertyDescriptor(state, prop) {
				const owner = latest(state);
				const desc = Reflect.getOwnPropertyDescriptor(owner, prop);
				if (!desc) return desc;
				return {
					writable: true,
					configurable: state.type_ !== 1 || prop !== "length",
					enumerable: desc.enumerable,
					value: owner[prop]
				};
			},
			defineProperty() {
				die(11);
			},
			getPrototypeOf(state) {
				return getPrototypeOf(state.base_);
			},
			setPrototypeOf() {
				die(12);
			}
		};
		var arrayTraps = {};
		each(objectTraps, (key, fn) => {
			arrayTraps[key] = function() {
				arguments[0] = arguments[0][0];
				return fn.apply(this, arguments);
			};
		});
		arrayTraps.deleteProperty = function(state, prop) {
			return arrayTraps.set.call(this, state, prop, void 0);
		};
		arrayTraps.set = function(state, prop, value) {
			return objectTraps.set.call(this, state[0], prop, value, state[0]);
		};
		function peek(draft, prop) {
			const state = draft[DRAFT_STATE];
			return (state ? latest(state) : draft)[prop];
		}
		function readPropFromProto(state, source, prop) {
			const desc = getDescriptorFromProto(source, prop);
			return desc ? `value` in desc ? desc.value : desc.get?.call(state.draft_) : void 0;
		}
		function getDescriptorFromProto(source, prop) {
			if (!(prop in source)) return void 0;
			let proto = getPrototypeOf(source);
			while (proto) {
				const desc = Object.getOwnPropertyDescriptor(proto, prop);
				if (desc) return desc;
				proto = getPrototypeOf(proto);
			}
		}
		function markChanged(state) {
			if (!state.modified_) {
				state.modified_ = true;
				if (state.parent_) markChanged(state.parent_);
			}
		}
		function prepareCopy(state) {
			if (!state.copy_) state.copy_ = shallowCopy(state.base_, state.scope_.immer_.useStrictShallowCopy_);
		}
		var Immer2 = class {
			constructor(config) {
				this.autoFreeze_ = true;
				this.useStrictShallowCopy_ = false;
				/**
				* The `produce` function takes a value and a "recipe function" (whose
				* return value often depends on the base state). The recipe function is
				* free to mutate its first argument however it wants. All mutations are
				* only ever applied to a __copy__ of the base state.
				*
				* Pass only a function to create a "curried producer" which relieves you
				* from passing the recipe function every time.
				*
				* Only plain objects and arrays are made mutable. All other objects are
				* considered uncopyable.
				*
				* Note: This function is __bound__ to its `Immer` instance.
				*
				* @param {any} base - the initial state
				* @param {Function} recipe - function that receives a proxy of the base state as first argument and which can be freely modified
				* @param {Function} patchListener - optional function that will be called with all the patches produced here
				* @returns {any} a new state, or the initial state if nothing was modified
				*/
				this.produce = (base, recipe, patchListener) => {
					if (typeof base === "function" && typeof recipe !== "function") {
						const defaultBase = recipe;
						recipe = base;
						const self = this;
						return function curriedProduce(base2 = defaultBase, ...args) {
							return self.produce(base2, (draft) => recipe.call(this, draft, ...args));
						};
					}
					if (typeof recipe !== "function") die(6);
					if (patchListener !== void 0 && typeof patchListener !== "function") die(7);
					let result;
					if (isDraftable(base)) {
						const scope = enterScope(this);
						const proxy = createProxy(base, void 0);
						let hasError = true;
						try {
							result = recipe(proxy);
							hasError = false;
						} finally {
							if (hasError) revokeScope(scope);
							else leaveScope(scope);
						}
						usePatchesInScope(scope, patchListener);
						return processResult(result, scope);
					} else if (!base || typeof base !== "object") {
						result = recipe(base);
						if (result === void 0) result = base;
						if (result === NOTHING) result = void 0;
						if (this.autoFreeze_) freeze(result, true);
						if (patchListener) {
							const p = [];
							const ip = [];
							getPlugin("Patches").generateReplacementPatches_(base, result, p, ip);
							patchListener(p, ip);
						}
						return result;
					} else die(1, base);
				};
				this.produceWithPatches = (base, recipe) => {
					if (typeof base === "function") return (state, ...args) => this.produceWithPatches(state, (draft) => base(draft, ...args));
					let patches, inversePatches;
					return [
						this.produce(base, recipe, (p, ip) => {
							patches = p;
							inversePatches = ip;
						}),
						patches,
						inversePatches
					];
				};
				if (typeof config?.autoFreeze === "boolean") this.setAutoFreeze(config.autoFreeze);
				if (typeof config?.useStrictShallowCopy === "boolean") this.setUseStrictShallowCopy(config.useStrictShallowCopy);
			}
			createDraft(base) {
				if (!isDraftable(base)) die(8);
				if (isDraft(base)) base = current(base);
				const scope = enterScope(this);
				const proxy = createProxy(base, void 0);
				proxy[DRAFT_STATE].isManual_ = true;
				leaveScope(scope);
				return proxy;
			}
			finishDraft(draft, patchListener) {
				const state = draft && draft[DRAFT_STATE];
				if (!state || !state.isManual_) die(9);
				const { scope_: scope } = state;
				usePatchesInScope(scope, patchListener);
				return processResult(void 0, scope);
			}
			/**
			* Pass true to automatically freeze all copies created by Immer.
			*
			* By default, auto-freezing is enabled.
			*/
			setAutoFreeze(value) {
				this.autoFreeze_ = value;
			}
			/**
			* Pass true to enable strict shallow copy.
			*
			* By default, immer does not copy the object descriptors such as getter, setter and non-enumrable properties.
			*/
			setUseStrictShallowCopy(value) {
				this.useStrictShallowCopy_ = value;
			}
			applyPatches(base, patches) {
				let i;
				for (i = patches.length - 1; i >= 0; i--) {
					const patch = patches[i];
					if (patch.path.length === 0 && patch.op === "replace") {
						base = patch.value;
						break;
					}
				}
				if (i > -1) patches = patches.slice(i + 1);
				const applyPatchesImpl = getPlugin("Patches").applyPatches_;
				if (isDraft(base)) return applyPatchesImpl(base, patches);
				return this.produce(base, (draft) => applyPatchesImpl(draft, patches));
			}
		};
		function createProxy(value, parent) {
			const draft = isMap(value) ? getPlugin("MapSet").proxyMap_(value, parent) : isSet(value) ? getPlugin("MapSet").proxySet_(value, parent) : createProxyProxy(value, parent);
			(parent ? parent.scope_ : getCurrentScope()).drafts_.push(draft);
			return draft;
		}
		function current(value) {
			if (!isDraft(value)) die(10, value);
			return currentImpl(value);
		}
		function currentImpl(value) {
			if (!isDraftable(value) || isFrozen(value)) return value;
			const state = value[DRAFT_STATE];
			let copy;
			if (state) {
				if (!state.modified_) return state.base_;
				state.finalized_ = true;
				copy = shallowCopy(value, state.scope_.immer_.useStrictShallowCopy_);
			} else copy = shallowCopy(value, true);
			each(copy, (key, childValue) => {
				set(copy, key, currentImpl(childValue));
			});
			if (state) state.finalized_ = false;
			return copy;
		}
		var immer = new Immer2();
		var produce = immer.produce;
		immer.produceWithPatches.bind(immer);
		immer.setAutoFreeze.bind(immer);
		immer.setUseStrictShallowCopy.bind(immer);
		immer.applyPatches.bind(immer);
		immer.createDraft.bind(immer);
		immer.finishDraft.bind(immer);
		//#endregion
		//#region node_modules/.pnpm/@deepseek-ai+dsh-client-store@0.2.0-rc.2_@deepseek-ai+cordis@4.0.4/node_modules/@deepseek-ai/dsh-client-store/lib/index.js
		/**
		* React-free snapshot store engine (zustand vanilla + immer + subscribeWithSelector +
		* rafFlush middleware + opt-in persist + dev freeze) plus the declarative
		* shell over it: {@link defineStore} bakes an init/persist/actions literal
		* into a {@link StoreHandle}, the registration-side store seat of slot
		* terminals. Engine products are bare observables — subscribe/getSnapshot/
		* update/set, NO selector hook. Hook synthesis is ui-renderer's (the one
		* uSES bridge, cached per source at the binding site).
		*/
		/**
		* Notify an observer set without allowing one callback to starve the rest.
		* @param listeners - current observer callbacks; copied before dispatch.
		* @param label - diagnostic owner prefix.
		* @param args - callback arguments.
		*/
		function notifySubscribers(listeners, label, ...args) {
			for (const listener of [...listeners]) try {
				listener(...args);
			} catch (error) {
				console.error(`${label} subscriber failed:`, error);
			}
		}
		/** Batches subscriber notification into one flush per animation frame. */
		function rafBatch(notify) {
			const schedule = typeof requestAnimationFrame === "function" ? (fn) => {
				requestAnimationFrame(() => {
					fn();
				});
			} : (fn) => {
				queueMicrotask(fn);
			};
			let scheduled = false;
			return () => {
				if (scheduled) return;
				scheduled = true;
				schedule(() => {
					scheduled = false;
					notify();
				});
			};
		}
		/**
		* Create a snapshot store.
		*
		* Flush default is 'sync' (controlled inputs need same-tick echo); frame-driven
		* stores opt into 'raf', where a frame's worth of updates coalesces into one
		* notification. Known raf-mode tradeoff: a component mounting mid-frame reads
		* fresh state while existing subscribers hear it next flush — transient
		* frame-level skew, same nature as the object layer's microtask batching.
		*
		* @param init - initial state.
		* @param opts - flush mode and opt-in persistence (localStorage, keyed by name).
		* @returns the store.
		*/
		function createSnapshotStore(init, opts) {
			const withSelector = subscribeWithSelector(() => init);
			const api = createStore()(withSelector);
			if (opts?.persist) attachPersistence(api, opts.persist.name);
			let subscribe = (fn) => api.subscribe(() => {
				notifySubscribers([fn], "[client-store]");
			});
			if (opts?.flush === "raf") {
				const listeners = /* @__PURE__ */ new Set();
				const flush = rafBatch(() => {
					notifySubscribers(listeners, "[client-store]");
				});
				api.subscribe(flush);
				subscribe = (fn) => {
					listeners.add(fn);
					return () => {
						listeners.delete(fn);
					};
				};
			}
			return {
				getSnapshot: () => api.getState(),
				subscribe: (fn) => subscribe(fn),
				update: (mutator) => {
					api.setState(produce(api.getState(), (draft) => {
						mutator(draft);
					}), true);
				},
				set: (next) => {
					api.setState(devFreeze(next), true);
				}
			};
		}
		/**
		* Whole-value JSON persistence to localStorage. Hand-rolled instead of the
		* zustand persist middleware: its write path spreads state into an object
		* (`partialize({ ...get() })`), exploding primitive state (a persisted string
		* draft becomes {0:'h',1:'e',...}) — not fixable via merge/deserialize options
		* because the corruption happens before serialization. Storage failures
		* (quota, private mode) only disable persistence, never break the store.
		*/
		function attachPersistence(api, name) {
			if (typeof localStorage === "undefined") return;
			try {
				const raw = localStorage.getItem(name);
				if (raw !== null) api.setState(devFreeze(JSON.parse(raw)), true);
			} catch (error) {
				console.error(`snapshot store '${name}' rehydration failed:`, error);
			}
			api.subscribe((state) => {
				try {
					localStorage.setItem(name, JSON.stringify(state));
				} catch (error) {
					console.error(`snapshot store '${name}' persistence failed:`, error);
				}
			});
		}
		/** Deep-freeze draftable wholesale-set state outside production: set() bypasses immer's freeze. */
		function devFreeze(value) {
			return freeze(value, true);
		}
		//#endregion
		//#region src/shared.ts
		/** Browser-safe eye-care settings and RPC wire values. */
		/** User-selectable eye-care operating modes. */
		const EYE_CARE_MODES = [
			"off",
			"auto",
			"light",
			"dark"
		];
		/** Warmth levels shared by light and dark palettes. */
		const EYE_CARE_INTENSITIES = [
			"soft",
			"balanced",
			"warm"
		];
		/** Loopback-only Connection RPC channel owned by this package. */
		const EYE_CARE_RPC_CHANNEL = "/eye-care";
		/** RPC endpoint that reads the current settings snapshot. */
		const EYE_CARE_RPC_READ = "settings.read";
		/** RPC endpoint that replaces the settings section. */
		const EYE_CARE_RPC_SAVE = "settings.save";
		/** Settings field carrying the selected mode. */
		const MODE_FIELD = "mode";
		/** Settings field carrying the selected warmth. */
		const INTENSITY_FIELD = "intensity";
		/** Defaults used when no user section exists. */
		const DEFAULT_EYE_CARE_SETTINGS = Object.freeze({
			mode: "off",
			intensity: "balanced"
		});
		/** Narrow an unknown value to one supported mode. */
		function isEyeCareMode(value) {
			return EYE_CARE_MODES.some((mode) => mode === value);
		}
		/** Narrow an unknown value to one supported warmth. */
		function isEyeCareIntensity(value) {
			return EYE_CARE_INTENSITIES.some((intensity) => intensity === value);
		}
		/** Decode a complete settings value from the RPC boundary. */
		function decodeEyeCareSettings(value) {
			if (typeof value !== "object" || value === null || Array.isArray(value)) return void 0;
			const record = value;
			if (!isEyeCareMode(record["mode"]) || !isEyeCareIntensity(record["intensity"])) return void 0;
			const restoreTheme = record["restoreTheme"];
			if (restoreTheme !== void 0 && restoreTheme !== "light" && restoreTheme !== "dark" && restoreTheme !== "system") return void 0;
			return {
				mode: record[MODE_FIELD],
				intensity: record[INTENSITY_FIELD],
				...restoreTheme === void 0 ? {} : { restoreTheme }
			};
		}
		/** Decode one complete Host snapshot from the RPC boundary. */
		function decodeEyeCareSnapshot(value) {
			if (typeof value !== "object" || value === null || Array.isArray(value)) return void 0;
			const record = value;
			const settingsEnvelope = record["settings"];
			if (record["schemaVersion"] !== 1 || typeof record["writable"] !== "boolean" || typeof settingsEnvelope !== "object" || settingsEnvelope === null || Array.isArray(settingsEnvelope)) return void 0;
			const settingsRecord = settingsEnvelope;
			const settings = decodeEyeCareSettings(settingsRecord["value"]);
			const revision = settingsRecord["revision"];
			if (settings === void 0 || !Number.isSafeInteger(revision) || revision < 0 || settingsRecord["applies"] !== "live") return void 0;
			const baseThemePreference = record["baseThemePreference"];
			if (baseThemePreference !== void 0 && baseThemePreference !== "light" && baseThemePreference !== "dark" && baseThemePreference !== "system") return void 0;
			return {
				schemaVersion: 1,
				writable: record["writable"],
				settings: {
					value: settings,
					revision,
					applies: "live"
				},
				...baseThemePreference === void 0 ? {} : { baseThemePreference }
			};
		}
		//#endregion
		//#region src/client/themes.ts
		/** Theme id prefix reserved by this package. */
		const EYE_CARE_THEME_PREFIX = "eye-care-";
		const LIGHT = {
			soft: {
				bgBase: "#fbf8ef",
				bgLayer1: "#fffdf6",
				bgLayer2: "#f8f3e8",
				bgLayer3: "#f2ecde",
				bgModule: "#f7f2e7",
				bgOverlay: "#ece4d5",
				textPrimary: "#29271f",
				textSecondary: "#575247",
				textTertiary: "#716a5d",
				textCaption: "#958b7a",
				border1: "rgba(85, 72, 46, 0.08)",
				border2: "rgba(85, 72, 46, 0.15)",
				border3: "rgba(85, 72, 46, 0.21)",
				hover: "rgba(126, 101, 53, 0.08)",
				hoverSolid: "#f1eadc",
				active: "rgba(126, 101, 53, 0.14)",
				primaryFill: "#44583d",
				primaryHover: "#536a49",
				primaryDimmed: "#dfe6d9",
				bubble: "#eef3df",
				bubbleHighlight: "#e0e9cb",
				input: "#fffdf6",
				selector: "#f2ecde",
				sidebar: "#f4efe3",
				sidebarHover: "#ebe4d5",
				sidebarActive: "#e2dac9",
				sidebarAccent: "#d6e0c1",
				code: "#f2eee4",
				codeBanner: "#ebe5d8",
				inlineCode: "#eee8db",
				scrollbar: "#d1c6b4",
				scrollbarHover: "#baad98",
				shiki: {
					constant: "#176f88",
					string: "#34783c",
					comment: "#817768",
					keyword: "#a03e58",
					parameter: "#a15b1f",
					function: "#6950a6",
					stringExpression: "#2f7040",
					punctuation: "#5a554d",
					link: "#246d9a"
				}
			},
			balanced: {
				bgBase: "#faf5e8",
				bgLayer1: "#fffaf0",
				bgLayer2: "#f5eddd",
				bgLayer3: "#eee3d0",
				bgModule: "#f3ead9",
				bgOverlay: "#e7dbc7",
				textPrimary: "#2b281f",
				textSecondary: "#5b5345",
				textTertiary: "#766d5b",
				textCaption: "#9b8e77",
				border1: "rgba(93, 72, 36, 0.09)",
				border2: "rgba(93, 72, 36, 0.17)",
				border3: "rgba(93, 72, 36, 0.24)",
				hover: "rgba(139, 100, 37, 0.09)",
				hoverSolid: "#eee3d1",
				active: "rgba(139, 100, 37, 0.16)",
				primaryFill: "#425b3c",
				primaryHover: "#52704a",
				primaryDimmed: "#dce7d3",
				bubble: "#eaf1d5",
				bubbleHighlight: "#dce7bc",
				input: "#fffaf0",
				selector: "#eee3d0",
				sidebar: "#f1e8d7",
				sidebarHover: "#e7dcc8",
				sidebarActive: "#ddd0b9",
				sidebarAccent: "#d2dfb3",
				code: "#efe9dc",
				codeBanner: "#e6dece",
				inlineCode: "#ebe2d1",
				scrollbar: "#ccbda6",
				scrollbarHover: "#b3a188",
				shiki: {
					constant: "#146d87",
					string: "#39753b",
					comment: "#837664",
					keyword: "#a13e57",
					parameter: "#a1581c",
					function: "#684ba3",
					stringExpression: "#34703d",
					punctuation: "#5d5549",
					link: "#206c98"
				}
			},
			warm: {
				bgBase: "#f8efda",
				bgLayer1: "#fff7e7",
				bgLayer2: "#f2e6d0",
				bgLayer3: "#eadcc4",
				bgModule: "#f0e3cc",
				bgOverlay: "#e1d0b5",
				textPrimary: "#30291f",
				textSecondary: "#615343",
				textTertiary: "#7c6a56",
				textCaption: "#a08b70",
				border1: "rgba(105, 73, 30, 0.10)",
				border2: "rgba(105, 73, 30, 0.19)",
				border3: "rgba(105, 73, 30, 0.27)",
				hover: "rgba(151, 97, 27, 0.10)",
				hoverSolid: "#eadbc2",
				active: "rgba(151, 97, 27, 0.18)",
				primaryFill: "#3f5c39",
				primaryHover: "#506f46",
				primaryDimmed: "#d8e5ce",
				bubble: "#e6efc9",
				bubbleHighlight: "#d6e3ac",
				input: "#fff7e7",
				selector: "#eadcc4",
				sidebar: "#eee1ca",
				sidebarHover: "#e3d3b9",
				sidebarActive: "#d7c4a7",
				sidebarAccent: "#cedeaa",
				code: "#ece2d1",
				codeBanner: "#e2d5c0",
				inlineCode: "#e7dac4",
				scrollbar: "#c7b398",
				scrollbarHover: "#ad9779",
				shiki: {
					constant: "#116b83",
					string: "#3e7439",
					comment: "#85735e",
					keyword: "#a33b54",
					parameter: "#a25418",
					function: "#67459e",
					stringExpression: "#386d39",
					punctuation: "#625344",
					link: "#1c6b94"
				}
			}
		};
		const DARK = {
			soft: {
				bgBase: "#20211c",
				bgLayer1: "#25261f",
				bgLayer2: "#2a2b23",
				bgLayer3: "#313128",
				bgModule: "#2d2e26",
				bgOverlay: "#3a392e",
				textPrimary: "#ece9dc",
				textSecondary: "#c7c1b0",
				textTertiary: "#aaa28f",
				textCaption: "#7f786a",
				border1: "rgba(245, 233, 201, 0.07)",
				border2: "rgba(245, 233, 201, 0.13)",
				border3: "rgba(245, 233, 201, 0.19)",
				hover: "rgba(244, 227, 182, 0.08)",
				hoverSolid: "#36362c",
				active: "rgba(244, 227, 182, 0.14)",
				primaryFill: "#dfe9cf",
				primaryHover: "#f1f5e7",
				primaryDimmed: "#4d5143",
				bubble: "#30372a",
				bubbleHighlight: "#3d4933",
				input: "#2b2d25",
				selector: "#37382e",
				sidebar: "#252820",
				sidebarHover: "#30342a",
				sidebarActive: "#3a3e32",
				sidebarAccent: "#3f4b35",
				code: "#1c1e1b",
				codeBanner: "#252821",
				inlineCode: "#292c24",
				scrollbar: "#57584d",
				scrollbarHover: "#707064",
				shiki: {
					constant: "#68b7d2",
					string: "#91c88b",
					comment: "#9d988d",
					keyword: "#e39aaf",
					parameter: "#e6ad72",
					function: "#b9a5df",
					stringExpression: "#9bcf91",
					punctuation: "#c7c2b7",
					link: "#77b8d9"
				}
			},
			balanced: {
				bgBase: "#211f19",
				bgLayer1: "#27231c",
				bgLayer2: "#2d2921",
				bgLayer3: "#353027",
				bgModule: "#302b22",
				bgOverlay: "#40382b",
				textPrimary: "#efe7d6",
				textSecondary: "#cbc0aa",
				textTertiary: "#aea087",
				textCaption: "#837662",
				border1: "rgba(250, 230, 190, 0.08)",
				border2: "rgba(250, 230, 190, 0.15)",
				border3: "rgba(250, 230, 190, 0.21)",
				hover: "rgba(247, 216, 157, 0.09)",
				hoverSolid: "#3b352b",
				active: "rgba(247, 216, 157, 0.16)",
				primaryFill: "#e0ebcf",
				primaryHover: "#f2f7e6",
				primaryDimmed: "#505243",
				bubble: "#32392a",
				bubbleHighlight: "#404c32",
				input: "#302b23",
				selector: "#3b352a",
				sidebar: "#282820",
				sidebarHover: "#33342a",
				sidebarActive: "#3d3e32",
				sidebarAccent: "#435036",
				code: "#1d1d19",
				codeBanner: "#28251f",
				inlineCode: "#2d2922",
				scrollbar: "#5b584b",
				scrollbarHover: "#757062",
				shiki: {
					constant: "#69b8d0",
					string: "#94c985",
					comment: "#a19a8d",
					keyword: "#e49aad",
					parameter: "#e7aa6c",
					function: "#bca2df",
					stringExpression: "#9dcc89",
					punctuation: "#cbc2b2",
					link: "#79b9d5"
				}
			},
			warm: {
				bgBase: "#231e17",
				bgLayer1: "#2a231b",
				bgLayer2: "#31291f",
				bgLayer3: "#3a3025",
				bgModule: "#342b21",
				bgOverlay: "#46392b",
				textPrimary: "#f1e4cf",
				textSecondary: "#cdbb9f",
				textTertiary: "#b09a7e",
				textCaption: "#857058",
				border1: "rgba(255, 225, 177, 0.09)",
				border2: "rgba(255, 225, 177, 0.17)",
				border3: "rgba(255, 225, 177, 0.24)",
				hover: "rgba(252, 207, 136, 0.10)",
				hoverSolid: "#403529",
				active: "rgba(252, 207, 136, 0.18)",
				primaryFill: "#e1ebcc",
				primaryHover: "#f3f7e4",
				primaryDimmed: "#535143",
				bubble: "#353a28",
				bubbleHighlight: "#444d30",
				input: "#342a20",
				selector: "#403428",
				sidebar: "#2b271e",
				sidebarHover: "#363127",
				sidebarActive: "#413a2e",
				sidebarAccent: "#485235",
				code: "#1f1b17",
				codeBanner: "#2b241d",
				inlineCode: "#31281f",
				scrollbar: "#605548",
				scrollbarHover: "#7a6b5b",
				shiki: {
					constant: "#6ab9ce",
					string: "#98c87e",
					comment: "#a59a89",
					keyword: "#e696a8",
					parameter: "#e8a765",
					function: "#bea0dc",
					stringExpression: "#a0cb82",
					punctuation: "#cec0ad",
					link: "#7bb9d1"
				}
			}
		};
		/** Build the stable id for one concrete eye-care theme. */
		function eyeCareThemeId(scheme, intensity) {
			return `${EYE_CARE_THEME_PREFIX}${scheme}-${intensity}`;
		}
		function tokensOf(palette) {
			return Object.freeze({
				"--dsw-alias-bg-base": palette.bgBase,
				"--dsw-alias-bg-layer-1": palette.bgLayer1,
				"--dsw-alias-bg-layer-2": palette.bgLayer2,
				"--dsw-alias-bg-layer-3": palette.bgLayer3,
				"--dsw-alias-bg-module-platform": palette.bgModule,
				"--dsw-alias-bg-multi-select": palette.bgModule,
				"--dsw-alias-bg-overlay": palette.bgOverlay,
				"--dsw-alias-bg-skeleton": palette.hover,
				"--dsw-alias-border-l1": palette.border1,
				"--dsw-alias-border-l2-darkmode-thin": palette.border2,
				"--dsw-alias-border-l2": palette.border2,
				"--dsw-alias-border-l3": palette.border3,
				"--dsw-alias-border-l4": palette.border3,
				"--dsw-alias-brand-primary": palette.textPrimary,
				"--dsw-alias-brand-text": palette.textPrimary,
				"--dsw-alias-button-contrast-fill": palette.textSecondary,
				"--dsw-alias-button-elevated-fill": palette.bgLayer3,
				"--dsw-alias-button-floating-fill": palette.bgLayer2,
				"--dsw-alias-button-floating-hover": palette.hoverSolid,
				"--dsw-alias-button-ghost-active-border": palette.textCaption,
				"--dsw-alias-button-ghost-active-fill": palette.active,
				"--dsw-alias-button-ghost-active-hover": palette.hoverSolid,
				"--dsw-alias-button-primary-fill": palette.primaryFill,
				"--dsw-alias-button-primary-hover": palette.primaryHover,
				"--dsw-alias-button-primary-dimmed": palette.primaryDimmed,
				"--dsw-alias-interactive-bg-active": palette.active,
				"--dsw-alias-interactive-bg-hover-accent": palette.active,
				"--dsw-alias-interactive-bg-hover": palette.hover,
				"--dsw-alias-interactive-bg-hover-solid": palette.hoverSolid,
				"--dsw-alias-label-caption": palette.textCaption,
				"--dsw-alias-label-dimmed": palette.border3,
				"--dsw-alias-label-primary-bluish": palette.textPrimary,
				"--dsw-alias-label-primary-dimmed": palette.textPrimary,
				"--dsw-alias-label-primary": palette.textPrimary,
				"--dsw-alias-label-secondary": palette.textSecondary,
				"--dsw-alias-label-tertiary": palette.textTertiary,
				"--dsw-alias-markdown-citation": palette.hoverSolid,
				"--dsw-alias-markdown-code-block-banner": palette.codeBanner,
				"--dsw-alias-markdown-code-block": palette.code,
				"--dsw-alias-markdown-code-segment-selected": palette.bgLayer3,
				"--dsw-alias-markdown-code-segment-unselected": palette.code,
				"--dsw-alias-markdown-inline-code": palette.inlineCode,
				"--dsw-alias-markdown-placeholder": palette.bgModule,
				"--dsw-alias-markdown-tag": palette.hoverSolid,
				"--dsw-alias-scrollbar-bg-l1": palette.scrollbar,
				"--dsw-alias-scrollbar-bg-l2": palette.scrollbar,
				"--dsw-alias-scrollbar-hover-l1": palette.scrollbarHover,
				"--dsw-alias-scrollbar-hover-l2": palette.scrollbarHover,
				"--dsw-specific-bubble-highlight": palette.bubbleHighlight,
				"--dsw-specific-bubble": palette.bubble,
				"--dsw-specific-input-major": palette.input,
				"--dsw-specific-login-input": palette.bgLayer2,
				"--dsw-specific-menu": palette.bgLayer3,
				"--dsw-specific-selector": palette.selector,
				"--dsw-specific-sidebar-fill": palette.sidebar,
				"--dsw-specific-sidebar-nav-item-active-accent": palette.sidebarAccent,
				"--dsw-specific-sidebar-nav-item-active": palette.sidebarActive,
				"--dsw-specific-sidebar-nav-item-hover": palette.sidebarHover,
				"--dsw-specific-tip": palette.bgModule,
				"--shiki-foreground": palette.textPrimary,
				"--shiki-background": palette.code,
				"--shiki-token-constant": palette.shiki.constant,
				"--shiki-token-string": palette.shiki.string,
				"--shiki-token-comment": palette.shiki.comment,
				"--shiki-token-keyword": palette.shiki.keyword,
				"--shiki-token-parameter": palette.shiki.parameter,
				"--shiki-token-function": palette.shiki.function,
				"--shiki-token-string-expression": palette.shiki.stringExpression,
				"--shiki-token-punctuation": palette.shiki.punctuation,
				"--shiki-token-link": palette.shiki.link
			});
		}
		/** Six concrete themes registered for the two schemes and three warmth levels. */
		const EYE_CARE_THEMES = Object.freeze(["light", "dark"].flatMap((scheme) => [
			"soft",
			"balanced",
			"warm"
		].map((intensity) => Object.freeze({
			id: eyeCareThemeId(scheme, intensity),
			colorScheme: scheme,
			tokens: tokensOf((scheme === "light" ? LIGHT : DARK)[intensity])
		}))));
		const EYE_CARE_THEME_IDS = new Set(EYE_CARE_THEMES.map((theme) => theme.id));
		/** Whether a theme id is one of this package's registered concrete themes. */
		function isEyeCareThemeId(id) {
			return EYE_CARE_THEME_IDS.has(id);
		}
		//#endregion
		//#region src/client/controller.ts
		const INITIAL_STATE = {
			settings: { ...DEFAULT_EYE_CARE_SETTINGS },
			status: "loading",
			writable: false,
			revision: void 0,
			error: null
		};
		/** Maximum delay accepted for ui-theme's already-started Host adoption. */
		const STARTUP_BASE_THEME_GRACE_MS = 1e3;
		function sameSettings(left, right) {
			return left.mode === right.mode && left.intensity === right.intensity;
		}
		function messageOf(error) {
			return error instanceof Error ? error.message : String(error);
		}
		/** Stateful controller shared by theme listeners and the Settings row. */
		var EyeCareController = class {
			/** Reactive row source. */
			store = createSnapshotStore(INITIAL_STATE);
			theme;
			rpc;
			media;
			now;
			unregisterThemes = [];
			unsubscribeTheme;
			unsubscribeMedia;
			tail = Promise.resolve();
			disposeTask;
			pendingSettings;
			disposed = false;
			applyingTheme = 0;
			restoreTheme = "system";
			hasRestoreTheme = false;
			acceptedRemoteSnapshot = false;
			startupBaseTheme;
			startupBaseThemeDeadline = 0;
			removeTokenLayer;
			activeBaseTheme;
			/**
			* Register the concrete themes and lifecycle listeners.
			* @param options - theme, transport, and system-scheme collaborators.
			*/
			constructor(options) {
				this.theme = options.theme;
				this.rpc = options.rpc;
				this.now = options.now ?? Date.now;
				this.media = options.media ?? (typeof matchMedia === "function" ? matchMedia("(prefers-color-scheme: dark)") : void 0);
				const currentTheme = this.theme.getTheme().preference;
				if (!isEyeCareThemeId(currentTheme)) {
					this.restoreTheme = currentTheme;
					this.hasRestoreTheme = true;
				}
				try {
					for (const definition of EYE_CARE_THEMES) this.unregisterThemes.push(this.theme.register(definition));
					this.unsubscribeTheme = options.subscribeTheme((snapshot) => {
						this.onThemeChanged(snapshot);
					});
					if (this.media !== void 0) {
						const media = this.media;
						const listener = () => {
							if (!this.disposed && this.store.getSnapshot().settings.mode === "auto") this.applyCurrentTheme();
						};
						media.addEventListener("change", listener);
						this.unsubscribeMedia = () => {
							media.removeEventListener("change", listener);
						};
					}
				} catch (error) {
					for (const unregister of this.unregisterThemes.splice(0).reverse()) unregister();
					throw error;
				}
			}
			/**
			* Load durable settings without blocking plugin activation.
			* @returns settlement after this read reaches the serialized transport queue.
			*/
			load() {
				if (this.rpc === void 0) {
					this.setUnavailable();
					return Promise.resolve();
				}
				if (this.store.getSnapshot().revision === void 0) this.store.update((state) => {
					state.status = "loading";
					state.error = null;
				});
				return this.enqueue(async () => {
					await this.readRemote();
				});
			}
			/**
			* Select a mode and persist the latest selection when Host settings are writable.
			* @param mode - next operating mode.
			* @returns settlement after the serialized persistence attempt.
			*/
			setMode(mode) {
				return this.select({
					...this.store.getSnapshot().settings,
					mode
				});
			}
			/**
			* Select a warmth and persist the latest selection when Host settings are writable.
			* @param intensity - next warmth level.
			* @returns settlement after the serialized persistence attempt.
			*/
			setIntensity(intensity) {
				return this.select({
					...this.store.getSnapshot().settings,
					intensity
				});
			}
			/** Queue a refresh after a Host settings invalidation. */
			refresh() {
				this.load();
			}
			/**
			* Reach transport quiescence, restore the user's live non-eye-care theme, and unregister all resources.
			* @returns settlement after cleanup completes.
			*/
			dispose() {
				return this.disposeTask ??= this.disposeOnce();
			}
			async disposeOnce() {
				this.disposed = true;
				this.pendingSettings = void 0;
				const failures = [];
				for (const unsubscribe of [this.unsubscribeMedia, this.unsubscribeTheme]) {
					if (unsubscribe === void 0) continue;
					try {
						unsubscribe();
					} catch (error) {
						failures.push(error);
					}
				}
				this.unsubscribeMedia = void 0;
				this.unsubscribeTheme = void 0;
				await this.tail;
				const current = this.theme.getTheme();
				this.removeTokenLayer?.();
				this.removeTokenLayer = void 0;
				if (isEyeCareThemeId(current.preference) || current.preference === this.activeBaseTheme) try {
					this.setTheme(this.resolveRestoreTheme());
				} catch (error) {
					failures.push(error);
					try {
						this.setTheme("system");
					} catch (fallbackError) {
						failures.push(fallbackError);
					}
				}
				for (const unregister of this.unregisterThemes.splice(0).reverse()) try {
					unregister();
				} catch (error) {
					failures.push(error);
				}
				if (failures.length > 0) throw new AggregateError(failures, "eye-care cleanup failed");
			}
			enqueue(operation) {
				if (this.disposed) return Promise.resolve();
				const task = this.tail.then(async () => {
					if (!this.disposed) await operation();
				});
				this.tail = task.catch(() => {});
				return task;
			}
			select(settings) {
				if (this.disposed) return Promise.resolve();
				if (this.store.getSnapshot().settings.mode === "off" && settings.mode !== "off") this.captureRestoreTheme();
				this.store.update((state) => {
					state.settings = settings;
					state.error = null;
					if (state.status === "error") state.status = state.revision === void 0 ? "unavailable" : "ready";
				});
				this.applyCurrentTheme();
				return this.persist(settings);
			}
			persist(settings) {
				const state = this.store.getSnapshot();
				if (this.rpc === void 0) {
					this.setUnavailable(state.error);
					return Promise.resolve();
				}
				if (state.revision !== void 0 && !state.writable) {
					this.setUnavailable(state.error);
					return Promise.resolve();
				}
				this.pendingSettings = {
					mode: settings.mode,
					intensity: settings.intensity
				};
				if (this.theme.overrideTokens !== void 0 && settings.mode !== "off" && (this.restoreTheme === "light" || this.restoreTheme === "dark" || this.restoreTheme === "system")) this.pendingSettings.restoreTheme = this.restoreTheme;
				return this.enqueue(async () => {
					await this.flushPending();
				});
			}
			async flushPending() {
				while (!this.disposed && this.pendingSettings !== void 0) {
					const desired = this.pendingSettings;
					this.pendingSettings = void 0;
					let state = this.store.getSnapshot();
					if (state.revision === void 0) {
						if (this.pendingSettings === void 0) this.pendingSettings = desired;
						if (!await this.readRemote()) return;
						continue;
					}
					if (!state.writable || state.revision === void 0) {
						this.setUnavailable(state.error);
						return;
					}
					this.store.update((next) => {
						next.status = "saving";
						next.error = null;
					});
					let response;
					try {
						const rpc = this.rpc;
						if (rpc === void 0) return;
						response = await rpc.call(EYE_CARE_RPC_CHANNEL, EYE_CARE_RPC_SAVE, {
							expectedRevision: state.revision,
							value: desired
						});
					} catch (error) {
						if (!this.disposed) this.setUnavailable(messageOf(error));
						return;
					}
					if (this.disposed) return;
					if (!response.ok) {
						if (response.error.code === "settings-conflict") {
							const latest = this.pendingSettings ?? desired;
							this.pendingSettings = latest;
							if (!await this.readRemote()) return;
							if (this.disposed) return;
							continue;
						}
						this.setUnavailable(response.error.message);
						return;
					}
					const snapshot = decodeEyeCareSnapshot(response.value);
					if (snapshot === void 0) {
						this.store.update((next) => {
							next.status = "error";
							next.error = "eye-care Settings returned an invalid save response";
						});
						return;
					}
					const preserveSettings = this.pendingSettings !== void 0 || !sameSettings(this.store.getSnapshot().settings, desired);
					this.accept(snapshot, preserveSettings);
				}
			}
			async readRemote() {
				let response;
				try {
					const rpc = this.rpc;
					if (rpc === void 0) return false;
					response = await rpc.call(EYE_CARE_RPC_CHANNEL, EYE_CARE_RPC_READ, {});
				} catch (error) {
					if (!this.disposed) this.setUnavailable(messageOf(error), true);
					return false;
				}
				if (this.disposed) return false;
				if (!response.ok) {
					this.setUnavailable(response.error.message, true);
					return false;
				}
				const snapshot = decodeEyeCareSnapshot(response.value);
				if (snapshot === void 0) {
					this.store.update((state) => {
						state.status = "error";
						state.error = "eye-care Settings returned an invalid read response";
					});
					return false;
				}
				this.accept(snapshot, this.pendingSettings !== void 0);
				return true;
			}
			accept(snapshot, preserveSettings) {
				const previous = this.store.getSnapshot().settings;
				const next = preserveSettings ? previous : snapshot.settings.value;
				const firstRemote = !this.acceptedRemoteSnapshot;
				this.acceptedRemoteSnapshot = true;
				if (next.mode === "off") {
					this.startupBaseTheme = void 0;
					this.startupBaseThemeDeadline = 0;
					if (!this.hasRestoreTheme && snapshot.baseThemePreference !== void 0) {
						this.restoreTheme = snapshot.baseThemePreference;
						this.hasRestoreTheme = true;
					}
				} else if (firstRemote) {
					const base = next.restoreTheme ?? snapshot.baseThemePreference;
					if (base === void 0) {
						if (!this.hasRestoreTheme) this.captureRestoreTheme();
					} else {
						this.restoreTheme = base;
						this.hasRestoreTheme = true;
						if (this.theme.getTheme().preference !== base) {
							this.startupBaseTheme = base;
							this.startupBaseThemeDeadline = this.now() + STARTUP_BASE_THEME_GRACE_MS;
						}
					}
				} else if (!preserveSettings && previous.mode === "off") this.captureRestoreTheme(snapshot.baseThemePreference);
				this.store.set({
					settings: next,
					status: snapshot.writable ? "ready" : "unavailable",
					writable: snapshot.writable,
					revision: snapshot.settings.revision,
					error: null
				});
				this.applyCurrentTheme();
			}
			setUnavailable(error = null, clearRevision = false) {
				this.store.update((state) => {
					state.status = "unavailable";
					state.writable = false;
					if (clearRevision) state.revision = void 0;
					state.error = error;
				});
			}
			captureRestoreTheme(fallback) {
				const preference = this.theme.getTheme().preference;
				const candidate = isEyeCareThemeId(preference) ? fallback ?? "system" : preference;
				this.restoreTheme = candidate;
				this.hasRestoreTheme = true;
			}
			resolveRestoreTheme() {
				if (!this.hasRestoreTheme || this.restoreTheme === "system") return "system";
				return this.theme.getTheme().themes.some((theme) => theme.id === this.restoreTheme) ? this.restoreTheme : "system";
			}
			applyCurrentTheme() {
				const { mode, intensity } = this.store.getSnapshot().settings;
				const current = this.theme.getTheme().preference;
				if (mode === "off") {
					this.applyingTheme += 1;
					try {
						this.removeTokenLayer?.();
						this.removeTokenLayer = void 0;
						if (isEyeCareThemeId(current) || current === this.activeBaseTheme) this.setTheme(this.resolveRestoreTheme());
						this.activeBaseTheme = void 0;
					} finally {
						this.applyingTheme -= 1;
					}
					this.hasRestoreTheme = false;
					return;
				}
				if (!this.hasRestoreTheme) this.captureRestoreTheme();
				const scheme = mode === "auto" ? this.media?.matches === true ? "dark" : "light" : mode;
				if (this.theme.overrideTokens !== void 0) {
					const definition = EYE_CARE_THEMES.find((theme) => theme.id === eyeCareThemeId(scheme, intensity));
					const tokens = Object.fromEntries(Object.entries(definition.tokens).map(([name, value]) => [name, {
						light: value,
						dark: value
					}]));
					this.applyingTheme += 1;
					try {
						this.activeBaseTheme = mode === "auto" ? "system" : mode;
						this.removeTokenLayer = this.theme.overrideTokens("@anionex/dsh-eye-care", tokens);
						this.setTheme(this.activeBaseTheme);
					} finally {
						this.applyingTheme -= 1;
					}
					return;
				}
				this.setTheme(eyeCareThemeId(scheme, intensity));
			}
			setTheme(id) {
				if (this.theme.getTheme().preference === id) return;
				this.applyingTheme += 1;
				try {
					this.theme.setTheme(id);
				} finally {
					this.applyingTheme -= 1;
				}
			}
			onThemeChanged(snapshot) {
				if (this.disposed || this.applyingTheme > 0 || isEyeCareThemeId(snapshot.preference)) return;
				if (snapshot.preference === this.activeBaseTheme) return;
				if (this.startupBaseTheme !== void 0) {
					const expected = this.startupBaseTheme;
					const withinStartupWindow = this.now() <= this.startupBaseThemeDeadline;
					this.startupBaseTheme = void 0;
					this.startupBaseThemeDeadline = 0;
					if (withinStartupWindow && snapshot.preference === expected) {
						this.restoreTheme = expected;
						this.hasRestoreTheme = true;
						this.applyCurrentTheme();
						return;
					}
				}
				const state = this.store.getSnapshot();
				if (state.settings.mode === "off") return;
				this.restoreTheme = snapshot.preference;
				this.hasRestoreTheme = true;
				const settings = {
					...state.settings,
					mode: "off"
				};
				this.store.update((next) => {
					next.settings = settings;
					next.error = null;
				});
				this.applyCurrentTheme();
				this.persist(settings);
			}
		};
		//#endregion
		//#region src/client/locales.ts
		/** `settings.eyeCare` dictionaries. */
		/** Simplified Chinese dictionary. */
		const zh = {
			"title": "护眼模式",
			"description": "降低页面的冷白光感，长时间阅读更柔和。",
			"enabled.title": "护眼模式",
			"enabled.off": "关闭",
			"enabled.on": "开启",
			"advanced.title": "显示方式与暖色强度",
			"mode.title": "显示方式",
			"mode.off": "关闭",
			"mode.auto": "自动",
			"mode.light": "日间",
			"mode.dark": "夜间",
			"intensity.title": "暖色强度",
			"intensity.soft": "柔和",
			"intensity.balanced": "均衡",
			"intensity.warm": "温暖",
			"status.off": "护眼模式已关闭",
			"status.auto": "自动跟随系统明暗外观",
			"status.light": "正在使用暖色日间主题",
			"status.dark": "正在使用暖暗夜间主题",
			"status.local": "仅当前浏览器有效",
			"status.saving": "正在保存",
			"status.error": "设置暂未保存"
		};
		/** English dictionary. */
		const en = {
			"title": "Eye care",
			"description": "Use warm semantic themes to reduce cool-white glare during long reading sessions",
			"enabled.title": "Eye care",
			"enabled.off": "Off",
			"enabled.on": "On",
			"advanced.title": "Appearance and warmth",
			"mode.title": "Appearance",
			"mode.off": "Off",
			"mode.auto": "Auto",
			"mode.light": "Day",
			"mode.dark": "Night",
			"intensity.title": "Warmth",
			"intensity.soft": "Soft",
			"intensity.balanced": "Balanced",
			"intensity.warm": "Warm",
			"status.off": "Eye care is off",
			"status.auto": "Following the system light or dark appearance",
			"status.light": "Warm day theme is active",
			"status.dark": "Warm night theme is active",
			"status.local": "Current browser only",
			"status.saving": "Saving",
			"status.error": "Setting is not saved yet"
		};
		//#endregion
		//#region src/client/index.tsx
		/** Required browser services. */
		const inject = [
			"slots",
			"locale",
			"theme",
			"connection",
			"remote"
		];
		/** Register settings copy, controller lifecycle, and General row. */
		function apply(ctx) {
			const theme = ctx.get("theme");
			const connection = ctx.get("connection");
			const controller = new EyeCareController({
				theme,
				...connection.isLoopback ? { rpc: connection.rpc } : {},
				subscribeTheme: (listener) => ctx.on("theme/change", listener)
			});
			ctx.effect(() => ctx.locale.register("settings.eyeCare", {
				zh,
				en
			}), "dsh-eye-care: dictionaries");
			ctx.effect(() => {
				const refresh = (namespace) => {
					if (namespace !== void 0 && namespace !== "eye-care" && namespace !== "dsh-eye-care") return;
					controller.refresh();
				};
				const disposers = [ctx.remote.$on("settings/document-updated", refresh), ctx.on("connection/reset", () => {
					if (connection.isLoopback) controller.refresh();
				})];
				controller.load();
				return async () => {
					for (const dispose of disposers) dispose();
					await controller.dispose();
				};
			}, "dsh-eye-care: controller lifecycle");
			const injected = () => ({
				hooks: { eyeCare: controller.store },
				setMode: (mode) => controller.setMode(mode),
				setIntensity: (intensity) => controller.setIntensity(intensity)
			});
			ctx.slots.inject("settings.general.item", () => ctx.slots.register({
				name: "settings.general.item",
				id: "eye-care",
				order: 15,
				locale: "settings.eyeCare",
				inject: injected
			}, EyeCareRow));
		}
		//#endregion
		exports.EYE_CARE_THEMES = EYE_CARE_THEMES;
		exports.EyeCareController = EyeCareController;
		exports.apply = apply;
		exports.eyeCareThemeId = eyeCareThemeId;
		exports.inject = inject;
		exports.isEyeCareThemeId = isEyeCareThemeId;
		return module.exports;
	}
});

//# sourceMappingURL=client.js.map