(function (exports) {
'use strict';

/* Generated from Java with JSweet 2.0.0-rc1 - http://www.jsweet.org */
class Util {
    static printOut$java_lang_String(s) {
        let text = s == null ? "null" : s.toString();
        console.info(text);
    }
    static printOut$java_lang_String$java_lang_Object(msg, o) {
        Util.printOut$java_lang_String(msg + o);
    }
    static printOut(msg, o) {
        if (((typeof msg === 'string') || msg === null) && ((o != null) || o === null)) {
            return Util.printOut$java_lang_String$java_lang_Object(msg, o);
        }
        else if (((typeof msg === 'string') || msg === null) && o === undefined) {
            return Util.printOut$java_lang_String(msg);
        }
        else
            throw new Error('invalid overload');
    }
    static arrayPrintString(toPrint) {
        let msg = toPrint == null ? "null" : Debug.toStringWithHeader(toPrint);
        return msg;
    }
    static sf(val) {
        return Util.sigFigs(val, Util.DIGITS_SF);
    }
    static sfs(val) {
        let sf = new String(Util.sf(val)).toString();
        let sfs = sf.replace(new RegExp("(\\d{" + Util.DIGITS_SF + ",})\\.0(\\D?)", 'g'), "$1$2").replace(new RegExp("\\.0\\z", 'g'), "");
        return sfs;
    }
    static fxs(val) {
        return "0." + (Util.DECIMALS_FX === 1 ? "0" : Util.DECIMALS_FX === 2 ? "00" : "000");
    }
    /*private*/ static shortName(className) {
        let semiColon = className.lastIndexOf(';');
        let stop = semiColon > 0 ? semiColon : className.length;
        return className.substring(className.lastIndexOf('.') + 1, stop);
    }
    /*private*/ static sigFigs(val, digits) {
        if (digits < 0)
            throw Object.defineProperty(new Error("Digits <1=" + digits), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.Object', 'java.lang.RuntimeException', 'java.lang.IllegalArgumentException', 'java.lang.Exception'] });
        else if (((value) => Number.NEGATIVE_INFINITY === value || Number.POSITIVE_INFINITY === value)(val))
            throw Object.defineProperty(new Error("Infinite value"), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.Object', 'java.lang.RuntimeException', 'java.lang.IllegalArgumentException', 'java.lang.Exception'] });
        else if (digits === 0 || val === 0 || val !== val)
            return val;
        let ceiling = Math.pow(10, digits);
        let floor = ceiling / 10;
        let signum = (f => { if (f > 0) {
            return 1;
        }
        else if (f < 0) {
            return -1;
        }
        else {
            return 0;
        } })(val);
        let sf = Math.abs(val);
        if (sf < 0.001)
            return 0;
        let shiftUp = sf < floor;
        let factor = shiftUp ? 10 : 0.1;
        let shifted = 0;
        for (; sf > ceiling || sf < floor; shifted += shiftUp ? 1 : -1)
            sf *= factor;
        let exp = Math.pow(10, shifted);
        sf = (d => { if (d === Number.NaN) {
            return d;
        }
        else if (Number.POSITIVE_INFINITY === d || Number.NEGATIVE_INFINITY === d) {
            return d;
        }
        else if (d == 0) {
            return d;
        }
        else {
            return Math.round(d);
        } })(sf) / exp;
        if (true || !shiftUp)
            return sf * signum;
        let trim = sf;
        if (trim !== sf)
            Util.printOut$java_lang_String("Doubles.sigFigs: val=" + sf + " trim=" + trim);
        return trim * signum;
    }
    static longEquals(now, then) {
        return then != null && (JSON.stringify(now) === JSON.stringify(then));
        let equal = false;
        if (then != null && then.length === now.length) {
            equal = true;
            for (let i = 0; i < now.length; i++) {
                let equals = ((o1, o2) => { if (o1 && o1.equals) {
                    return o1.equals(o2);
                }
                else {
                    return o1 === o2;
                } })(now[i], then[i]);
                if (!equals)
                    console.info(now[i] + ">" + then[i]);
                equal = equals && equal;
            }
            
        }
        return equal;
    }
}
Util.DIGITS_SF = 3;
Util.DECIMALS_FX = 2;
Util["__class"] = "fjs.util.Util";

/* Generated from Java with JSweet 2.0.0-rc1 - http://www.jsweet.org */
/**
 * Utility methods for arrays.
 * @class
 */
class Objects {
    static toString$java_lang_Object_A$java_lang_String(items, spacer) {
        if (items == null)
            return "null";
        else if (items.length === 0)
            return "";
        let list = ([]);
        let trim = false && !((o1, o2) => { if (o1 && o1.equals) {
            return o1.equals(o2);
        }
        else {
            return o1 === o2;
        } })(spacer, "\n");
        let at = 0;
        for (let index141 = 0; index141 < items.length; index141++) {
            let item = items[index141];
            /* add */ (list.push((item == null ? "null" : trim ? item.toString().trim() : item) + (++at === items.length ? "" : spacer)) > 0);
        }
        return ('[' + list.join(', ') + ']');
    }
    static toString(items, spacer) {
        if (((items != null && items instanceof Array && (items.length == 0 || items[0] == null || (items[0] != null))) || items === null) && ((typeof spacer === 'string') || spacer === null)) {
            return Objects.toString$java_lang_Object_A$java_lang_String(items, spacer);
        }
        else if (((items != null && items instanceof Array && (items.length == 0 || items[0] == null || (items[0] != null))) || items === null) && spacer === undefined) {
            return Objects.toString$java_lang_Object_A(items);
        }
        else
            throw new Error('invalid overload');
    }
    static toString$java_lang_Object_A(array) {
        return Objects.toString$java_lang_Object_A$java_lang_String(array, ",");
    }
    static toLines(array) {
        if (array == null)
            return "null";
        let list = ([]);
        for (let i = 0; i < array.length; i++)
            (list.push((array[i] == null ? "null" : Debug.info(array[i])) + (i < array.length - 1 ? "\n" : "")) > 0);
        let lines = ('[' + list.join(', ') + ']');
        return lines.replace(new RegExp("\n", 'g'), " ");
    }
}
Objects.debug = false;
Objects["__class"] = "fjs.util.Objects";

/**
 * Utilities for use during development.
 * @class
 */
class Debug {
    /**
     * Returns basic Debug.information about an object's type and identity.
     * <p>This will be some combination of
     * <ul>
     * <li>the non-trivial simple class name
     * <li>{@link Titled#title()} if available
     * </ul>
     * @param {*} o
     * @return {string}
     */
    static info(o) {
        if (o == null)
            return "null";
        else if (typeof o === 'boolean')
            return o.toString();
        else if (typeof o === 'number')
            return new String(o).toString();
        else if (typeof o === 'string') {
            let text = o;
            let length = text.length;
            return text.substring(0, Math.min(length, 60)) + ("");
        }
        let classe = o.constructor;
        let name = (c => c["__class"] ? c["__class"].substring(c["__class"].lastIndexOf('.') + 1) : c["name"].substring(c["name"].lastIndexOf('.') + 1))(classe);
        let id = "";
        let title = (c => c["__class"] ? c["__class"] : c["name"])(classe);
        if (o != null && (o["__interfaces"] != null && o["__interfaces"].indexOf("fjs.util.Identified") >= 0 || o.constructor != null && o.constructor["__interfaces"] != null && o.constructor["__interfaces"].indexOf("fjs.util.Identified") >= 0))
            id = " #" + o.identity();
        if (o != null && (o["__interfaces"] != null && o["__interfaces"].indexOf("fjs.util.Titled") >= 0 || o.constructor != null && o.constructor["__interfaces"] != null && o.constructor["__interfaces"].indexOf("fjs.util.Titled") >= 0))
            title = " \'" + o.title() + "\'";
        return name + id + title;
    }
    /**
     * Returns an array of <code>Debug.info</code>s.
     * @param {Array} array
     * @return {string}
     */
    static arrayInfo(array) {
        return "arrayInfo";
    }
    static traceEvent(string) {
        Util.printOut$java_lang_String(">>" + string);
    }
    static toStringWithHeader(array) {
        return Debug.info(array) + " [" + array.length + "] " + Objects.toLines(array);
    }
}
Debug.trace = false;
Debug["__class"] = "fjs.util.Debug";

/**
 * Utility superclass that can issue trace messages.
 * @param {string} top
 * @class
 */
class Tracer {
    constructor(top) {
        /*private*/ this.id = ++Tracer.ids;
        if (((typeof top === 'string') || top === null)) {
            let __args = Array.prototype.slice.call(arguments);
            this.top = null;
            this.id = ++Tracer.ids;
            this.top = null;
            (() => {
                this.top = top;
            })();
        }
        else if (top === undefined) {
            let __args = Array.prototype.slice.call(arguments);
            this.top = null;
            this.id = ++Tracer.ids;
            this.top = null;
            (() => {
                this.top = null;
            })();
        }
        else
            throw new Error('invalid overload');
    }
    /**
     *
     * @return {*}
     */
    identity() {
        return this.id;
    }
    static newTopped(top, live) {
        return new Tracer.TracerTopped(top);
    }
    trace$java_lang_String$java_lang_Object(msg, o) {
        this.traceOutput(msg + Debug.info(o));
    }
    /**
     * Outputs complete trace messages to console or elsewhere.
     * <p>Default prepends helpful classname to message.
     * @param {string} msg passed from one of the <code>public</code> methods
     */
    traceOutput(msg) {
        this.traceOutputWithId("" + msg);
    }
    traceOutputWithId(msg) {
        Util.printOut$java_lang_String((this.top != null ? (this.top + " #" + this.id) : Debug.info(this)) + " " + msg);
    }
    trace$java_lang_String(msg) {
        this.traceOutput(msg);
    }
    trace$java_lang_String$java_lang_Throwable$boolean(msg, t, stack) {
        if (stack = t != null && stack) {
            this.traceOutput(msg);
            console.error(t.message, t);
        }
        else
            this.traceOutput(msg + Debug.info(t));
    }
    trace(msg, t, stack) {
        if (((typeof msg === 'string') || msg === null) && ((t != null && (t["__classes"] && t["__classes"].indexOf("java.lang.Throwable") >= 0) || t != null && t instanceof Error) || t === null) && ((typeof stack === 'boolean') || stack === null)) {
            return this.trace$java_lang_String$java_lang_Throwable$boolean(msg, t, stack);
        }
        else if (((typeof msg === 'string') || msg === null) && ((t != null && (t instanceof Array)) || t === null) && stack === undefined) {
            return this.trace$java_lang_String$java_util_Collection(msg, t);
        }
        else if (((typeof msg === 'string') || msg === null) && ((t != null && t instanceof Array && (t.length == 0 || t[0] == null || (t[0] != null))) || t === null) && stack === undefined) {
            return this.trace$java_lang_String$java_lang_Object_A(msg, t);
        }
        else if (((typeof msg === 'string') || msg === null) && ((t != null) || t === null) && stack === undefined) {
            return this.trace$java_lang_String$java_lang_Object(msg, t);
        }
        else if (((typeof msg === 'string') || msg === null) && t === undefined && stack === undefined) {
            return this.trace$java_lang_String(msg);
        }
        else
            throw new Error('invalid overload');
    }
    trace$java_lang_String$java_util_Collection(msg, c) {
        this.traceOutput(msg + this.traceArrayText(/* toArray */ c.slice(0)));
    }
    trace$java_lang_String$java_lang_Object_A(msg, array) {
        this.traceOutput(msg + this.traceArrayText(array));
    }
    traceDebug$java_lang_String$java_lang_Object(msg, o) {
        this.traceOutput(msg + Debug.info(o));
    }
    traceDebug$java_lang_String$java_lang_Object_A(msg, array) {
        this.traceOutput(msg + (Debug.arrayInfo(array)));
    }
    traceDebug(msg, array) {
        if (((typeof msg === 'string') || msg === null) && ((array != null && array instanceof Array && (array.length == 0 || array[0] == null || (array[0] != null))) || array === null)) {
            return this.traceDebug$java_lang_String$java_lang_Object_A(msg, array);
        }
        else if (((typeof msg === 'string') || msg === null) && ((array != null) || array === null)) {
            return this.traceDebug$java_lang_String$java_lang_Object(msg, array);
        }
        else
            throw new Error('invalid overload');
    }
    traceArrayText(array) {
        return Util.arrayPrintString(array);
        let lines = new String("[\n");
        for (let index142 = 0; index142 < array.length; index142++) {
            let o = array[index142];
            lines += ("  " + Debug.info(o) + "\n");
        }
        lines += ("]");
        console.info(lines);
        throw Object.defineProperty(new Error("Not implemented in " + this), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.Object', 'java.lang.RuntimeException', 'java.lang.Exception'] });
        return lines;
    }
}
Tracer.ids = 0;
Tracer["__class"] = "fjs.util.Tracer";
Tracer["__interfaces"] = ["fjs.util.Identified"];
(function (Tracer) {
    class TracerTopped extends Tracer {
        constructor(top) {
            super(top);
            this.__fjs_util_Tracer_TracerTopped_top = null;
            this.__fjs_util_Tracer_TracerTopped_top = top;
        }
        /**
         *
         * @param {string} msg
         */
        traceOutput(msg) {
            if (this.doTrace())
                super.traceOutput(msg);
        }
        doTrace() {
            return true;
        }
    }
    Tracer.TracerTopped = TracerTopped;
    TracerTopped["__class"] = "fjs.util.Tracer.TracerTopped";
    TracerTopped["__interfaces"] = ["fjs.util.Identified"];
})(Tracer || (Tracer = {}));

/* Generated from Java with JSweet 2.0.0-rc1 - http://www.jsweet.org */
/**
 * Core implementation of key interfaces.
 * <p>{@link NotifyingCore} is the base class of both the {@link STarget} and
 * {@link STargeter} class hierarchies.
 * <p>Declared <code>public</code> for documentation purposes only; client code should
 * use the concrete subclass hierarchies.
 * @param {string} title
 * @class
 * @extends Tracer
 */
class NotifyingCore extends Tracer {
    constructor(title) {
        super();
        /*private*/ this.__identity = NotifyingCore.identities++;
        this.__title = null;
        this.__notifiable = null;
        this.__title = title;
    }
    title() {
        return this.__title;
    }
    /**
     *
     * @return {*}
     */
    notifiable() {
        if (this.__notifiable == null)
            throw Object.defineProperty(new Error("No notifiable in " + Debug.info(this)), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.IllegalStateException', 'java.lang.Object', 'java.lang.RuntimeException', 'java.lang.Exception'] });
        else
            return this.__notifiable;
    }
    /**
     *
     * @param {*} notice
     */
    notify(notice) {
        if (Debug.trace)
            Debug.traceEvent("Notified in " + this + " with " + notice + ": notifiable=" + this.__notifiable);
        if (this.__notifiable == null)
            return;
        if (!this.blockNotification())
            this.__notifiable.notify(notice);
        else if (Debug.trace)
            Debug.traceEvent("Notification blocked in " + this);
    }
    /**
     *
     */
    notifyParent() {
        if (this.__notifiable == null)
            return;
        this.__notifiable.notify(Debug.info(this));
    }
    /**
     * Enables notification to be restricted to this member of the tree.
     * <p>Checked by {@link #notify(Object)}; default returns <code>false</code>.
     * @return {boolean}
     */
    blockNotification() {
        return false;
    }
    /**
     *
     * @param {*} n
     */
    setNotifiable(n) {
        this.__notifiable = n;
    }
    /**
     *
     * @return {string}
     */
    toString() {
        return Debug.info(this);
    }
}
NotifyingCore.identities = 0;
NotifyingCore["__class"] = "fjs.core.NotifyingCore";
NotifyingCore["__interfaces"] = ["fjs.util.Identified", "fjs.core.Notifying", "fjs.core.Notifiable", "fjs.util.Titled"];

/* Generated from Java with JSweet 2.0.0-rc1 - http://www.jsweet.org */
var NotifyingType;
(function (NotifyingType) {
    NotifyingType[NotifyingType["Target"] = 0] = "Target";
    NotifyingType[NotifyingType["Targeter"] = 1] = "Targeter";
    NotifyingType[NotifyingType["Frame"] = 2] = "Frame";
})(NotifyingType || (NotifyingType = {}));

/* Generated from Java with JSweet 2.0.0-rc1 - http://www.jsweet.org */
/**
 * Construct a {@link TargeterCore} to match <code>target</code>.
 * @param {*} targetType set as {@link #targetType}.
 * @class
 * @extends NotifyingCore
 */
class TargeterCore extends NotifyingCore {
    constructor(targetType) {
        super("Untargeted");
        /*private*/ this.facets = ([]);
        this.__elements = null;
        this.__target = null;
        this.targetType = null;
        this.targetType = targetType;
        /* add */ (TargeterCore.targeters_$LI$().push(this) > 0);
        if (Debug.trace)
            Debug.traceEvent("Created " + this);
    }
    static targeters_$LI$() { if (TargeterCore.targeters == null)
        TargeterCore.targeters = ([]); return TargeterCore.targeters; }
    ;
    retarget(target) {
        if (target == null)
            throw Object.defineProperty(new Error("Null target in " + Debug.info(this)), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.Object', 'java.lang.RuntimeException', 'java.lang.IllegalArgumentException', 'java.lang.Exception'] });
        this.__target = target;
        let targets = target.elements();
        if (targets == null)
            throw Object.defineProperty(new Error("No targets in " + Debug.info(this)), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.IllegalStateException', 'java.lang.Object', 'java.lang.RuntimeException', 'java.lang.Exception'] });
        if (this.__elements == null) {
            let list = ([]);
            for (let index138 = 0; index138 < targets.length; index138++) {
                let t = targets[index138];
                {
                    let targeter = t.newTargeter();
                    targeter.setNotifiable(this);
                    /* add */ (list.push(targeter) > 0);
                }
            }
            this.__elements = ((a1, a2) => { if (a1.length >= a2.length) {
                a1.length = 0;
                a1.push.apply(a1, a2);
                return a1;
            }
            else {
                return a2.slice(0);
            } })([], list);
            
        }
        if (targets.length === this.__elements.length)
            for (let i = 0; i < this.__elements.length; i++)
                this.__elements[i].retarget(targets[i]);
        if (target.notifiesTargeter())
            target.setNotifiable(this);
    }
    attachFacet(facet) {
        if (facet == null)
            throw Object.defineProperty(new Error("Null facet in " + Debug.info(this)), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.Object', 'java.lang.RuntimeException', 'java.lang.IllegalArgumentException', 'java.lang.Exception'] });
        if (!(this.facets.indexOf((facet)) >= 0)) {
            facet.retarget(this.__target);
            /* add */ (this.facets.push(facet) > 0);
        }
        if (Debug.trace)
            Debug.traceEvent("Attached facet " + Debug.info(facet) + " to " + Debug.info(this));
    }
    retargetFacets() {
        let facets = ((a1, a2) => { if (a1.length >= a2.length) {
            a1.length = 0;
            a1.push.apply(a1, a2);
            return a1;
        }
        else {
            return a2.slice(0);
        } })([], this.facets);
        for (let i = 0; i < this.__elements.length; i++)
            this.__elements[i].retargetFacets();
        if (facets == null)
            return;
        for (let i = 0; i < facets.length; i++) {
            facets[i].retarget(this.__target);
            if (Debug.trace)
                Debug.traceEvent("Retargeted facet " + Debug.info(facets[i]) + " in " + this);
        }
        
    }
    elements() {
        if (this.__elements == null)
            throw Object.defineProperty(new Error("No elements in " + Debug.info(this)), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.IllegalStateException', 'java.lang.Object', 'java.lang.RuntimeException', 'java.lang.Exception'] });
        return this.__elements;
    }
    target() {
        if (this.__target == null)
            throw Object.defineProperty(new Error("No target in " + Debug.info(this)), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.IllegalStateException', 'java.lang.Object', 'java.lang.RuntimeException', 'java.lang.Exception'] });
        return this.__target;
    }
    title() {
        return this.__target == null ? super.title() : this.__target.title();
    }
    toString() {
        let targetInfo = this.__target == null ? "" : Debug.info(this.__target);
        return Debug.info(this) + ("");
    }
    /**
     *
     * @return {NotifyingType}
     */
    type() {
        return NotifyingType.Targeter;
    }
}
TargeterCore["__class"] = "fjs.core.TargeterCore";
TargeterCore["__interfaces"] = ["fjs.util.Identified", "fjs.core.Notifying", "fjs.core.SRetargetable", "fjs.core.Notifiable", "fjs.util.Titled", "fjs.core.Facetable", "fjs.core.STargeter"];
TargeterCore.targeters_$LI$();

/* Generated from Java with JSweet 2.0.0-rc1 - http://www.jsweet.org */
/**
 * Core constructor.
 * @param {string} title should be suitable for return as the (immutable)
 * <code>title</code> property
 * @param {Array} elements may be <code>null</code> (in which case
 * suitable elements may be created using <code>lazyElements</code>); otherwise
 * passed to {@link #setElements(STarget[])}
 * @class
 * @extends NotifyingCore
 */
class TargetCore extends NotifyingCore {
    constructor(title, ...elements) {
        if (((typeof title === 'string') || title === null) && ((elements != null && elements instanceof Array && (elements.length == 0 || elements[0] == null || (elements[0] != null && (elements[0]["__interfaces"] != null && elements[0]["__interfaces"].indexOf("fjs.core.STarget") >= 0 || elements[0].constructor != null && elements[0].constructor["__interfaces"] != null && elements[0].constructor["__interfaces"].indexOf("fjs.core.STarget") >= 0)))) || elements === null)) {
            let __args = Array.prototype.slice.call(arguments);
            super(title);
            this.__elements = null;
            this.elementsSet = false;
            this.live = true;
            this.__elements = null;
            (() => {
                if (title == null || ((o1, o2) => { if (o1 && o1.equals) {
                    return o1.equals(o2);
                }
                else {
                    return o1 === o2;
                } })(title, ""))
                    throw Object.defineProperty(new Error("Null or empty title in " + Debug.info(this)), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.Object', 'java.lang.RuntimeException', 'java.lang.IllegalArgumentException', 'java.lang.Exception'] });
                if (elements.length > 0)
                    this.setElements(elements);
                TargetCore.targets++;
                if (Debug.trace)
                    Debug.traceEvent("Created " + Debug.info(this));
            })();
        }
        else if (((typeof title === 'string') || title === null) && elements === undefined) {
            let __args = Array.prototype.slice.call(arguments);
            {
                let __args = Array.prototype.slice.call(arguments);
                let elements = [];
                super(title);
                this.__elements = null;
                this.elementsSet = false;
                this.live = true;
                this.__elements = null;
                (() => {
                    if (title == null || ((o1, o2) => { if (o1 && o1.equals) {
                        return o1.equals(o2);
                    }
                    else {
                        return o1 === o2;
                    } })(title, ""))
                        throw Object.defineProperty(new Error("Null or empty title in " + Debug.info(this)), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.Object', 'java.lang.RuntimeException', 'java.lang.IllegalArgumentException', 'java.lang.Exception'] });
                    if (elements.length > 0)
                        this.setElements(elements);
                    TargetCore.targets++;
                    if (Debug.trace)
                        Debug.traceEvent("Created " + Debug.info(this));
                })();
            }
        }
        else
            throw new Error('invalid overload');
    }
    /**
     * Sets the {@link STarget} children of the {@link TargetCore}.
     * <p>Intended for use in specialised subclass construction;
     * elements set are thereafter immutable.
     * @param {Array} elements (which may not be <code>null</code> nor contain <code>null</code>
     * members) will be returned as the <code>elements</code> property.
     */
    setElements(elements) {
        if (this.elementsSet)
            throw Object.defineProperty(new Error("Immutable elements in " + Debug.info(this)), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.Object', 'java.lang.RuntimeException', 'java.lang.Exception'] });
        this.__elements = elements;
        this.elementsSet = true;
        for (let i = 0; i < elements.length; i++)
            if (elements[i] == null)
                throw Object.defineProperty(new Error("Null element " + i + " in " + Debug.info(this)), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.Object', 'java.lang.RuntimeException', 'java.lang.IllegalArgumentException', 'java.lang.Exception'] });
        
    }
    /**
     * Implements interface method.
     * <p>If no elements have been set, attempts to create them with
     * <code>lazyElements</code>.
     * <p>Each call to this method also sets the {@link TargetCore}
     * as notification monitor of any element that is not a {@link
     * fjs.core.SFrameTarget}.
     *
     * @return {Array}
     */
    elements() {
        if (!this.elementsSet) {
            let lazy = this.lazyElements();
            this.setElements(lazy);
        }
        for (let i = 0; i < this.__elements.length; i++)
            if (!(this.__elements[i].type() === NotifyingType.Frame))
                this.__elements[i].setNotifiable(this);
        
        return this.__elements;
    }
    /**
     * Lazily creates <code>element</code>s for this target.
     * <p>Called at most once from {@link #elements()}.
     * <p>Though defined in {@link TargetCore} this method is primarily for use by
     * {@link SFrameTarget}s, which always create their elements dynamically
     * by reimplementing this method.
     * Default implementation returns an empty {@link STarget}[].
     * @return {Array}
     */
    lazyElements() {
        return [];
    }
    /**
     * Create and return a targeter suitable for retargeting to
     * this target.
     * <p>This is the key method used by Facets to implement dynamic
     * creation of a surface targeter tree. During initial retargeting
     * each {@link TargeterCore} queries its <code>target</code>
     * for any child elements, and calls this method on each child
     * to obtain suitable {@link STargeter} instances which
     * it then adds to its elements.
     * <p>This method may be also called on subsequent retargetings
     * where the specific type of a target is subject
     * to change (for instance when it represents a selection).
     * Either the {@link STargeter} returned can be matched
     * to an existing one to which facet have already been attached,
     * or such facet can be attached and the surface layout adjusted
     * accordingly.
     *
     * @return {*}
     */
    newTargeter() {
        return new TargeterCore(this.constructor);
    }
    isLive() {
        let n = this.notifiable();
        let notifiesTarget = n != null && (n != null && (n["__interfaces"] != null && n["__interfaces"].indexOf("fjs.core.STarget") >= 0 || n.constructor != null && n.constructor["__interfaces"] != null && n.constructor["__interfaces"].indexOf("fjs.core.STarget") >= 0));
        return !notifiesTarget ? this.live : this.live && n.isLive();
    }
    setLive(live) {
        this.live = live;
    }
    toString() {
        return Debug.info(this);
    }
    /**
     * Used to construct the notification tree.
     * <p><b>NOTE</b> This method must NOT be overridden in application code.
     * @return {boolean}
     */
    notifiesTargeter() {
        return true && this.__elements != null;
    }
    /**
     *
     * @return {NotifyingType}
     */
    type() {
        return NotifyingType.Target;
    }
    /**
     *
     * @return {*}
     */
    state() {
        throw Object.defineProperty(new Error("Not implemented in " + this), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.Object', 'java.lang.RuntimeException', 'java.lang.Exception'] });
    }
    /**
     *
     * @param {*} update
     */
    updateState(update) {
        throw Object.defineProperty(new Error("Not implemented in " + this), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.Object', 'java.lang.RuntimeException', 'java.lang.Exception'] });
    }
}
TargetCore.targets = 0;
TargetCore["__class"] = "fjs.core.TargetCore";
TargetCore["__interfaces"] = ["fjs.core.STarget", "fjs.util.Identified", "fjs.core.Notifying", "fjs.core.Notifiable", "fjs.util.Titled"];

/* Generated from Java with JSweet 2.0.0-rc1 - http://www.jsweet.org */
/**
 * Core constructor.
 * <p>Note that this passes no child target elements to the superclass;
 * elements can only be set by subclassing and
 * <ul>
 * <li>in named subclasses where the elements are known at
 * construction, calling {@link #setElements(STarget[])}
 * from the constructor
 * <li>in other cases (in practice the large majority), overriding
 * {@link #lazyElements()} from {@link TargetCore}
 * </ul>
 * <p>This limitation ensures that the effective type of
 * a {@link SFrameTarget} with child elements can be distinguished
 * by reference to the compiled type. Care must therefore be
 * taken in client code not vary the effective type of the
 * elements created by a subclass.
 * @param {string} title passed to the superclass
 * @param {*} toFrame must not be <code>null</code>
 * @class
 * @extends TargetCore
 */
class SFrameTarget extends TargetCore {
    constructor(title, toFrame) {
        super(title);
        this.framed = null;
        if (toFrame == null)
            throw Object.defineProperty(new Error("Null framed in " + Debug.info(this)), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.Object', 'java.lang.RuntimeException', 'java.lang.IllegalArgumentException', 'java.lang.Exception'] });
        this.framed = toFrame;
    }
    notifiesTargeter() {
        return true;
    }
    title() {
        return this.framed == null || !(this.framed != null && (this.framed["__interfaces"] != null && this.framed["__interfaces"].indexOf("fjs.util.Titled") >= 0 || this.framed.constructor != null && this.framed.constructor["__interfaces"] != null && this.framed.constructor["__interfaces"].indexOf("fjs.util.Titled") >= 0)) ? super.title() : this.framed.title();
    }
}
SFrameTarget.frames = 0;
SFrameTarget["__class"] = "fjs.core.SFrameTarget";
SFrameTarget["__interfaces"] = ["fjs.core.STarget", "fjs.util.Identified", "fjs.core.Notifying", "fjs.core.Notifiable", "fjs.util.Titled"];

/* Generated from Java with JSweet 2.0.0-rc1 - http://www.jsweet.org */
/**
 * Unique constructor.
 * @param {string} title passed to superclass
 * @param {SIndexing.Coupler} coupler supplies application-specific mechanism and policy
 * @class
 * @extends TargetCore
 */
class SIndexing extends TargetCore {
    constructor(title, coupler) {
        super(title);
        this.coupler = null;
        this.__index = null;
        this.indexings = null;
        this.coupler = coupler;
    }
    /**
     * The first index into the <code>indexables</code>.
     * @return {number}
     */
    index() {
        return this.__index;
    }
    /**
     * The items exposed to indexing.
     * <p>These will either have been set during construction or be read
     * dynamically from the coupler.
     * @return {Array}
     */
    indexables() {
        let indexables = this.coupler.getIndexables(this);
        if (indexables == null || indexables.length === 0)
            throw Object.defineProperty(new Error("Null or empty indexables in " + this), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.IllegalStateException', 'java.lang.Object', 'java.lang.RuntimeException', 'java.lang.Exception'] });
        else
            return indexables;
    }
    facetIndexables() {
        return this.coupler.getFacetSelectables(this);
    }
    /**
     * Sets a single index into the <code>indexables</code>.
     * @param {number} index
     */
    setIndex(index) {
        let first = this.__index == null;
        this.__index = index;
        if (!first)
            this.coupler.indexSet(this);
    }
    /**
     * The item denoted by the current <code>index</code>.
     * @return {*}
     */
    indexed() {
        if (this.__index == null)
            throw Object.defineProperty(new Error("No index in " + Debug.info(this)), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.IllegalStateException', 'java.lang.Object', 'java.lang.RuntimeException', 'java.lang.Exception'] });
        else
            return this.indexables()[this.__index];
    }
    /**
     *
     * @return {*}
     */
    state() {
        return this.index();
    }
    /**
     *
     * @param {*} update
     */
    updateState(update) {
        this.setIndex(update);
    }
}
SIndexing["__class"] = "fjs.core.SIndexing";
SIndexing["__interfaces"] = ["fjs.core.STarget", "fjs.util.Identified", "fjs.core.Notifying", "fjs.core.Notifiable", "fjs.util.Titled"];
(function (SIndexing) {
    /**
     * Connects an {@link SIndexing} to the application.
     * <p>A {@link Coupler} supplies client-specific mechanism and
     * policy for an {@link SIndexing}.
     * @class
     */
    class Coupler {
        constructor() {
        }
        /**
         * Called whenever an index changes.
         * @param {SIndexing} i
         */
        indexSet(i) {
        }
    }
    SIndexing.Coupler = Coupler;
    Coupler["__class"] = "fjs.core.SIndexing.Coupler";
    Coupler["__interfaces"] = ["fjs.core.TargetCoupler", "java.io.Serializable"];
})(SIndexing || (SIndexing = {}));

/* Generated from Java with JSweet 2.0.0-rc1 - http://www.jsweet.org */
/**
 * Construct a policy that constrains valid values within the immutable range
 * <code>min</code> to <code>max</code>.
 * @param {number} min
 * @param {number} max
 * @class
 * @extends Tracer
 */
class NumberPolicy extends Tracer {
    constructor(min, max) {
        super();
        this.__min = 0;
        this.__max = 0;
        if (min > max)
            throw Object.defineProperty(new Error("Bad values " + min + ">=" + max), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.Object', 'java.lang.RuntimeException', 'java.lang.IllegalArgumentException', 'java.lang.Exception'] });
        this.__min = min;
        this.__max = max;
    }
    static MIN_VALUE_$LI$() { if (NumberPolicy.MIN_VALUE == null)
        NumberPolicy.MIN_VALUE = Number.MAX_VALUE * -1; return NumberPolicy.MIN_VALUE; }
    ;
    static MAX_VALUE_$LI$() { if (NumberPolicy.MAX_VALUE == null)
        NumberPolicy.MAX_VALUE = Number.MAX_VALUE; return NumberPolicy.MAX_VALUE; }
    ;
    /**
     * The highest possible value under the policy.
     * <p>Set immutably during construction but only accessed via
     * this method, enabling subclasses to define it dynamically by overriding.
     * @return {number}
     */
    max() {
        return this.__max;
    }
    /**
     * The lowest possible value under the policy.
     * <p>Set immutably during construction but only accessed via
     * this method, enabling subclasses to define it dynamically by overriding.
     * @return {number}
     */
    min() {
        return this.__min;
    }
    /**
     * Returns a valid increment to <code>existing</code> in the direction given
     * by <code>positive</code>, or zero if the incremented value is outside the range.
     * <p>Calculation of the increment takes into account
     * <code>unit</code>, <code>unitJump</code>, and <code>reverseIncrements</code> and
     * its sum with <code>existing</code> is validated using <code>valueValue</code>.
     * @param {number} existing
     * @param {boolean} positive
     * @return {number}
     */
    validIncrement(existing, positive) {
        let increment = this.unit() * this.unitJump() * (positive ? 1 : -1) * (this.reverseIncrements() ? -1 : 1);
        let proposed = existing + increment;
        let validated = this.validValue(existing, proposed);
        if (this.debug())
            this.trace$java_lang_String$java_lang_Object("NumericPolicy:", this.__min + "<=" + this.__max + ", existing=" + existing + ", nudged=" + proposed + ", validated=" + validated);
        return validated !== this.cycledValue(proposed) ? 0 : validated - existing;
    }
    /**
     * Returns the nearest valid value to <code>proposed</code>.
     * <p>Though not used in the basic implementation, specifying <code>existing</code>
     * as a parameter allows for non-linear validation in subclasses.
     * @param {number} existing
     * @param {number} proposed
     * @return {number}
     */
    validValue(existing, proposed) {
        let min = this.min();
        let max = this.max();
        let cycled = this.cycledValue(proposed);
        let adjusted = cycled < min ? min : cycled > max ? max : cycled;
        let jump = this.unit() * this.unitJump();
        let rounded = (d => { if (d === Number.NaN) {
            return d;
        }
        else if (Number.POSITIVE_INFINITY === d || Number.NEGATIVE_INFINITY === d) {
            return d;
        }
        else if (d == 0) {
            return d;
        }
        else {
            return Math.round(d);
        } })(adjusted / jump) * jump;
        if (this.debug()) {
            this.trace$java_lang_String$java_lang_Object("NumberPolicy: ", min + "<=" + max + ", existing=" + existing + ", proposed=" + Util.sf(proposed) + ", adjusted=" + Util.sf(adjusted) + ", jump=" + jump + ", rounded=" + Util.sf(rounded));
        }
        return rounded < min ? min : rounded > max ? max : rounded;
    }
    debug() {
        return false;
    }
    /**
     * The smallest possible increment under the policy.
     * <p>The default implementation deduces this value from {@link #format() }.
     * @return {number}
     */
    unit() {
        let format = this.format();
        if (format > NumberPolicy.FORMAT_DECIMALS_4)
            throw Object.defineProperty(new Error(format + " decimals not implemented in " + Debug.info(this)), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.IllegalStateException', 'java.lang.Object', 'java.lang.RuntimeException', 'java.lang.Exception'] });
        let unit = format < NumberPolicy.FORMAT_DECIMALS_1 ? 1 : format === NumberPolicy.FORMAT_DECIMALS_1 ? 0.1 : format === NumberPolicy.FORMAT_DECIMALS_2 ? 0.01 : format === NumberPolicy.FORMAT_DECIMALS_3 ? 0.001 : 1.0E-4;
        return unit;
    }
    /**
     * If <code>true</code>, values outside the range will be normalised to within
     * it.
     * <p>Default is <code>false</code>.
     * @return {boolean}
     */
    canCycle() {
        return false;
    }
    /**
     * Hint on formatting the number.
     * <p>These are defined by the class FORMAT_x constants, which are mutually exclusive.
     * <p>For FORMAT_PLACES_x constants
     * the format should normally be consistent with <code>unit</code>.
     * @return {number}
     */
    format() {
        return NumberPolicy.FORMAT_DECIMALS_0;
    }
    /**
     * The column width for text boxes in which values are to be displayed.
     * <p>Follows AWT convention.
     * @return {number}
     */
    columns() {
        return NumberPolicy.COLUMNS_DEFAULT;
    }
    toString() {
        return " format=" + this.format() + "  unit=" + Util.sf(this.unit()) + " " + Util.sf(this.min()) + "<=" + Util.sf(this.max());
    }
    cycledValue(proposed) {
        if (!this.canCycle())
            return proposed;
        let min = this.min();
        let max = this.max();
        let range = max - min;
        return proposed < min ? max - ((max - proposed) % range) : proposed > max ? min + ((proposed - min) % range) : proposed;
    }
    /**
     * Reverses the normal increment direction.
     * <p>Used by <code>validIncrement</code>, default is <code>false</code>.
     * @return {boolean}
     */
    reverseIncrements() {
        return false;
    }
    /**
     * Returns the multiple of <code>unit</code> defining the current minimum
     * valid value change.
     * @return {number}
     */
    unitJump() {
        return NumberPolicy.UNIT_JUMP_DEFAULT;
    }
}
NumberPolicy.COLUMNS_DEFAULT = 3;
NumberPolicy.UNIT_JUMP_DEFAULT = 1;
NumberPolicy.__debug = false;
NumberPolicy.FORMAT_DECIMALS_0 = 0;
NumberPolicy.FORMAT_DECIMALS_1 = 1;
NumberPolicy.FORMAT_DECIMALS_2 = 2;
NumberPolicy.FORMAT_DECIMALS_3 = 3;
NumberPolicy.FORMAT_DECIMALS_4 = 4;
NumberPolicy.FORMAT_HEX = -1;
NumberPolicy["__class"] = "fjs.util.NumberPolicy";
NumberPolicy["__interfaces"] = ["fjs.util.Identified"];
(function (NumberPolicy) {
    /**
     * Construct a tick-based policy that can optionally display the current value
     * within a local adjustment range.
     * <p>The policy is constructed from <code>min</code> to <code>max</code> as for its
     * superclass. If <code>range</code> is other than <code>NaN</code>, values
     * will be displayed within this adjustment range, which will centre on
     * the current value unless constrained by <code>min</code> to <code>max</code>.
     * @param {number} min
     * @param {number} max
     * @param {number} range
     * @class
     * @extends NumberPolicy
     */
    class Ticked extends NumberPolicy {
        constructor(min, max, range) {
            if (((typeof min === 'number') || min === null) && ((typeof max === 'number') || max === null) && ((typeof range === 'number') || range === null)) {
                let __args = Array.prototype.slice.call(arguments);
                super(min, max);
                this.__range = 0;
                this.__range = 0;
                (() => {
                    this.__range = range;
                })();
            }
            else if (((typeof min === 'number') || min === null) && ((typeof max === 'number') || max === null) && range === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                {
                    let __args = Array.prototype.slice.call(arguments);
                    let range = NaN;
                    super(min, max);
                    this.__range = 0;
                    this.__range = 0;
                    (() => {
                        this.__range = range;
                    })();
                }
            }
            else if (((typeof min === 'number') || min === null) && max === undefined && range === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                let range = __args[0];
                {
                    let __args = Array.prototype.slice.call(arguments);
                    let min = NumberPolicy.MIN_VALUE_$LI$();
                    let max = NumberPolicy.MAX_VALUE_$LI$();
                    super(min, max);
                    this.__range = 0;
                    this.__range = 0;
                    (() => {
                        this.__range = range;
                    })();
                }
            }
            else if (min === undefined && max === undefined && range === undefined) {
                let __args = Array.prototype.slice.call(arguments);
                {
                    let __args = Array.prototype.slice.call(arguments);
                    let min = NaN;
                    let max = NaN;
                    let range = NaN;
                    super(min, max);
                    this.__range = 0;
                    this.__range = 0;
                    (() => {
                        this.__range = range;
                    })();
                }
            }
            else
                throw new Error('invalid overload');
        }
        validValue(existing, proposed) {
            let local = this;
            return local === this ? super.validValue(existing, proposed) : local.validValue(existing, proposed);
        }
        /**
         * The number of ticks between each label.
         * @return {number}
         */
        labelSpacing() {
            return Ticked.LABEL_TICKS_DEFAULT;
        }
        /**
         * Returns the policy to be used for local adjustment.
         * <p>The default is to return the {@link Ticked} itself; this can be
         * overridden to return a policy for local adjustment where the {@link Ticked}
         * is full-range but local adjustment is also required.
         * @return {NumberPolicy.Ticked}
         */
        localTicks() {
            return this;
        }
        /**
         * The range of possible values.
         * <p>Set immutably during construction but only accessed via
         * this method, enabling subclasses to define it dynamically by overriding.
         * @return {number}
         */
        range() {
            return this.__range !== this.__range ? this.max() - this.min() : this.__range;
        }
        /**
         * Defines the snap-to-ticks contentStyle.
         * <p>The value returned should be one of
         * <ul><li>SNAP_NONE</li>
         * <li>SNAP_TICKS</li>
         * <li>SNAP_LABELS</li>
         * </ul>
         * @return {number}
         */
        snapType() {
            return Ticked.SNAP_TICKS;
        }
        /**
         * The spacing between each tick, in the value returned by {@link #unit()}.
         * @return {number}
         */
        tickSpacing() {
            return 1;
        }
        /**
         * Returns the multiple of <code>unit</code> defining the current minimum
         * valid value change, based on the current snap policy.
         * <p>The value returned is determined by the values of <code>snapType</code>
         * and <code>tickSpacing</code>.
         * @return {number}
         */
        unitJump() {
            let snap = this.snapType();
            let tick = this.tickSpacing();
            return snap === Ticked.SNAP_LABELS ? tick * this.labelSpacing() : snap === Ticked.SNAP_TICKS ? tick : 1;
        }
        toString() {
            let local = this.localTicks();
            return super.toString() + (local === this ? "" : local);
        }
    }
    Ticked.SNAP_NONE = 0;
    Ticked.SNAP_TICKS = 1;
    Ticked.SNAP_LABELS = 2;
    Ticked.TICKS_DEFAULT = 1;
    Ticked.LABEL_TICKS_DEFAULT = 10;
    NumberPolicy.Ticked = Ticked;
    Ticked["__class"] = "fjs.util.NumberPolicy.Ticked";
    Ticked["__interfaces"] = ["fjs.util.Identified"];
})(NumberPolicy || (NumberPolicy = {}));
NumberPolicy.MAX_VALUE_$LI$();
NumberPolicy.MIN_VALUE_$LI$();

/* Generated from Java with JSweet 2.0.0-rc1 - http://www.jsweet.org */
/**
 * Unique constructor.
 * @param {string} title passed to superclass
 * @param {number} value the initial value
 * @param {SNumeric.Coupler} coupler must supply application-specific mechanism and policy
 * @class
 * @extends TargetCore
 */
class SNumeric extends TargetCore {
    constructor(title, value, coupler) {
        super(title);
        /*private*/ this.__value = NaN;
        this.coupler = null;
        this.__policy = null;
        this.coupler = coupler;
        this.__policy = coupler.policy(this);
        if (this.__policy == null)
            throw Object.defineProperty(new Error("No policy in " + Debug.info(this)), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.IllegalStateException', 'java.lang.Object', 'java.lang.RuntimeException', 'java.lang.Exception'] });
        this.setValue(value);
    }
    /**
     * Returns the last valid value set.
     * <p>The value returned will that set using <code>setValue</code> or
     * during construction; if {@link #doRangeChecks} is set to <code>true</code>
     * it will be checked against the number policy minimum and maximum values.
     * @return {number}
     */
    value() {
        if (this.__value !== this.__value)
            throw Object.defineProperty(new Error("Not a number in " + Debug.info(this)), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.IllegalStateException', 'java.lang.Object', 'java.lang.RuntimeException', 'java.lang.Exception'] });
        else if (SNumeric.doRangeChecks) {
            let min = this.__policy.min();
            let max = this.__policy.max();
            if (this.__value < min || this.__value > max)
                throw Object.defineProperty(new Error("Value " + this.__value + " should be >=" + min + " and <=" + max + " in " + Debug.info(this)), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.IllegalStateException', 'java.lang.Object', 'java.lang.RuntimeException', 'java.lang.Exception'] });
        }
        return this.__value;
    }
    /**
     * Sets the nearest valid value to <code>value</code>.
     * <p>Validity will be as defined by <code>validValue</code> in
     * the {@link NumberPolicy} returned as <code>policy</code>.
     * Subsequently calls <code>valueSet</code> in the {@link SNumeric.Coupler} with which the
     * {@link SNumeric} was constructed.
     * @param {number} value
     */
    setValue(value) {
        let first = this.__value !== this.__value;
        this.__value = this.policy().validValue(this.__value, value);
        if (!first)
            this.coupler.valueSet(this);
    }
    /**
     * Returns the current number policy.
     * <p>The policy is that returned by the {@link fjs.core.SNumeric.Coupler}
     * with which the {@link SNumeric} was constructed.
     * @return {NumberPolicy}
     */
    policy() {
        return this.__policy;
    }
    toString() {
        let p = this.policy();
        return super.toString() + " value=" + Util.sf(this.__value) + " policy=" + p;
    }
    /**
     *
     * @return {*}
     */
    state() {
        return this.value();
    }
    /**
     *
     * @param {*} update
     */
    updateState(update) {
        this.setValue(update);
    }
}
SNumeric.doRangeChecks = false;
SNumeric["__class"] = "fjs.core.SNumeric";
SNumeric["__interfaces"] = ["fjs.core.STarget", "fjs.util.Identified", "fjs.core.Notifying", "fjs.core.Notifiable", "fjs.util.Titled"];
(function (SNumeric) {
    /**
     * Connects a {@link SNumeric} to the application.
     * <p>A {@link Coupler} supplies policy and/or client-specific
     * mechanism to a {@link SNumeric}.
     * @class
     */
    class Coupler {
        constructor() {
        }
        /**
         * Returns the policy to be used by a {@link fjs.core.SNumeric}
         * constructed with this {@link Coupler}.
         * @param {SNumeric} n
         * @return {NumberPolicy}
         */
        policy(n) {
            return new NumberPolicy(0, 0);
        }
        /**
         * Defines client-specific mechanism for a {@link fjs.core.SNumeric}.
         * <p>This method is called whenever <code>setValue</code> is called on <code>n</code>.
         * @param {SNumeric} n
         */
        valueSet(n) {
            throw Object.defineProperty(new Error("Not implemented in " + Debug.info(this)), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.Object', 'java.lang.RuntimeException', 'java.lang.Exception'] });
        }
    }
    SNumeric.Coupler = Coupler;
    Coupler["__class"] = "fjs.core.SNumeric.Coupler";
    Coupler["__interfaces"] = ["fjs.core.TargetCoupler", "java.io.Serializable"];
})(SNumeric || (SNumeric = {}));

var STarget;
(function (STarget) {
    function newTargets(src) {
        let type = "fjs.core.STarget";
        let array = new Array(src.length);
        /* arraycopy */ ((srcPts, srcOff, dstPts, dstOff, size) => { if (srcPts !== dstPts || dstOff >= srcOff + size) {
            while (--size >= 0)
                dstPts[dstOff++] = srcPts[srcOff++];
        }
        else {
            let tmp = srcPts.slice(srcOff, srcOff + size);
            for (let i = 0; i < size; i++)
                dstPts[dstOff++] = tmp[i];
        } })(src, 0, array, 0, array.length);
        return array;
    }
    STarget.newTargets = newTargets;
})(STarget || (STarget = {}));

/* Generated from Java with JSweet 2.0.0-rc1 - http://www.jsweet.org */
/**
 * Core constructor.
 * @param {string} title passed to superclass
 * @param {STextual.Coupler} coupler can supply application-specific mechanism and policy;
 * must be non-<code>null</code>
 * @class
 * @extends TargetCore
 */
class STextual extends TargetCore {
    constructor(title, coupler) {
        super(title);
        this.coupler = null;
        this.__text = null;
        this.textSet = false;
        if ((this.coupler = coupler) == null)
            throw Object.defineProperty(new Error("Null coupler in " + Debug.info(this)), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.Object', 'java.lang.RuntimeException', 'java.lang.IllegalArgumentException', 'java.lang.Exception'] });
    }
    /**
     * Sets the text value to be exposed.
     * <p>Also calls {@link STextual.Coupler#textSet(STextual)} if not initialising.
     * @param {string} text must be non-<code>null</code>; and non-blank
     * unless {@link STextual.Coupler#isValidText(STextual, String)}
     * returns <code>true</code>.
     */
    setText(text) {
        if (text == null || !this.coupler.isValidText(this, text))
            throw Object.defineProperty(new Error("Null or invalid text in " + Debug.info(this)), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.Object', 'java.lang.RuntimeException', 'java.lang.IllegalArgumentException', 'java.lang.Exception'] });
        this.__text = text;
        if (this.textSet)
            this.coupler.textSet(this);
        this.textSet = true;
        
    }
    /**
     * The text value represented.
     * @return {string}
     */
    text() {
        if (this.__text != null)
            return this.__text;
        let text = this.coupler.getText(this);
        if (text == null || !this.coupler.isValidText(this, text))
            throw Object.defineProperty(new Error("Null or invalid text in " + Debug.info(this)), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.IllegalStateException', 'java.lang.Object', 'java.lang.RuntimeException', 'java.lang.Exception'] });
        else
            return text;
    }
    /**
     *
     * @return {*}
     */
    state() {
        return this.text();
    }
    /**
     *
     * @param {*} update
     */
    updateState(update) {
        this.setText(update);
    }
    toString() {
        return super.toString() + ("");
    }
}
STextual["__class"] = "fjs.core.STextual";
STextual["__interfaces"] = ["fjs.core.STarget", "fjs.util.Identified", "fjs.core.Notifying", "fjs.core.Notifiable", "fjs.util.Titled"];
(function (STextual) {
    /**
     * Connects a {@link STextual} to the application.
     * <p>A {@link Coupler} is required to supply a {@link STextual}
     * with client-specific policy or mechanism.
     * @class
     * @extends Tracer
     */
    class Coupler extends Tracer {
        constructor() {
            super();
        }
        /**
         * Called when <code>setText</code> is called on <code>t</code>.
         * @param {STextual} t
         */
        textSet(t) {
        }
        /**
         * Is this text valid for the {@link STextual}?
         * <p>Default returns <code>true</code> for non-blank text.
         * @param {STextual} t
         * @param {string} text
         * @return {boolean}
         */
        isValidText(t, text) {
            return !((o1, o2) => { if (o1 && o1.equals) {
                return o1.equals(o2);
            }
            else {
                return o1 === o2;
            } })(text.trim(), "");
        }
        getText(t) {
            throw Object.defineProperty(new Error("Not implemented in " + Debug.info(this)), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.Object', 'java.lang.RuntimeException', 'java.lang.Exception'] });
        }
    }
    STextual.Coupler = Coupler;
    Coupler["__class"] = "fjs.core.STextual.Coupler";
    Coupler["__interfaces"] = ["fjs.util.Identified", "fjs.core.TargetCoupler", "java.io.Serializable"];
})(STextual || (STextual = {}));

/* Generated from Java with JSweet 2.0.0-rc1 - http://www.jsweet.org */
/**
 * Unique constructor.
 * @param {string} title passed to superclass
 * @param {boolean} state initial state of the toggling
 * @param {SToggling.Coupler} coupler can supply application-specific mechanism
 * @class
 * @extends TargetCore
 */
class SToggling extends TargetCore {
    constructor(title, state, coupler) {
        super(title);
        this.coupler = null;
        this.__state = false;
        this.__state = state;
        this.coupler = coupler;
    }
    /**
     * The Boolean state of the toggling.
     * <p>The value returned will that set using
     * <code>setState</code> or during construction.
     * @return {boolean}
     */
    isSet() {
        return this.__state;
    }
    /**
     * Sets the Boolean state.
     * <p> Subsequently calls {@link fjs.core.SToggling.Coupler#stateSet(SToggling)}.
     * @param {boolean} state
     */
    set(state) {
        this.__state = state;
        this.coupler.stateSet(this);
    }
    /**
     *
     * @param {*} update
     */
    updateState(update) {
        this.set(update);
    }
    /**
     *
     * @return {*}
     */
    state() {
        return this.isSet();
    }
    toString() {
        return super.toString() + (" " + this.__state);
    }
}
SToggling["__class"] = "fjs.core.SToggling";
SToggling["__interfaces"] = ["fjs.core.STarget", "fjs.util.Identified", "fjs.core.Notifying", "fjs.core.Notifiable", "fjs.util.Titled"];
(function (SToggling) {
    /**
     * Connects a {@link SToggling} to the application.
     * <p>A {@link Coupler} supplies application-specific mechanism
     * for a {@link SToggling}.
     * @class
     */
    class Coupler {
        constructor() {
        }
        /**
         * Called by the toggling whenever its state is set.
         * @param {SToggling} t
         */
        stateSet(t) {
        }
    }
    SToggling.Coupler = Coupler;
    Coupler["__class"] = "fjs.core.SToggling.Coupler";
    Coupler["__interfaces"] = ["fjs.core.TargetCoupler", "java.io.Serializable"];
})(SToggling || (SToggling = {}));

/* Generated from Java with JSweet 2.0.0-rc1 - http://www.jsweet.org */
/**
 * Unique constructor.
 * @param {string} title passed to superclass
 * @param {STrigger.Coupler} coupler supplies application-specific mechanism
 * @class
 * @extends TargetCore
 */
class STrigger extends TargetCore {
    constructor(title, coupler) {
        super(title);
        this.coupler = null;
        if (coupler == null)
            throw Object.defineProperty(new Error("Null coupler in " + Debug.info(this)), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.Object', 'java.lang.RuntimeException', 'java.lang.IllegalArgumentException', 'java.lang.Exception'] });
        this.coupler = coupler;
    }
    /**
     * Initiates the application process represented.
     * <p>Calls {@link Coupler#fired(STrigger)}.
     */
    fire() {
        this.coupler.fired(this);
    }
    /**
     *
     * @return {*}
     */
    state() {
        return "Stateless!";
    }
    /**
     *
     * @param {*} update
     */
    updateState(update) {
        this.fire();
    }
}
STrigger["__class"] = "fjs.core.STrigger";
STrigger["__interfaces"] = ["fjs.core.STarget", "fjs.util.Identified", "fjs.core.Notifying", "fjs.core.Notifiable", "fjs.util.Titled"];
(function (STrigger) {
    /**
     * Connects a {@link STrigger} to the application.
     * <p>A {@link Coupler} supplies application-specific mechanism and policy
     * for a {@link STrigger}.
     * @class
     */
    class Coupler {
        constructor() {
        }
    }
    STrigger.Coupler = Coupler;
    Coupler["__class"] = "fjs.core.STrigger.Coupler";
    Coupler["__interfaces"] = ["fjs.core.TargetCoupler", "java.io.Serializable"];
})(STrigger || (STrigger = {}));

/**
 * Unique constructor.
 * @param {IndexingFrame} indexed will be the first target of this instance
 * @class
 * @extends TargeterCore
 */
class IndexingFrameTargeter extends TargeterCore {
    constructor(indexed) {
        super(indexed.constructor);
        this.__indexing = null;
        this.indexed = null;
    }
    /**
     * Retargeted to the {@link SIndexing} wrapped by the current target.
     * @return {*}
     */
    indexing() {
        if (this.__indexing == null)
            throw Object.defineProperty(new Error("No indexingLink in " + Debug.info(this)), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.IllegalStateException', 'java.lang.Object', 'java.lang.RuntimeException', 'java.lang.Exception'] });
        else
            return this.__indexing;
    }
    /**
     * Overrides superclass method.
     * @param {*} target
     */
    retarget(target) {
        let frame = target;
        let ix = frame.indexing();
        let indexedFrame = frame.indexedFrame();
        super.retarget(frame);
        if (this.__indexing == null) {
            let list = ([]);
            for (let index139 = 0; index139 < this.__elements.length; index139++) {
                let e = this.__elements[index139];
                /* add */ (list.push(e) > 0);
            }
            this.__indexing = ix.newTargeter();
            /* add */ (list.push(this.__indexing) > 0);
            this.indexed = indexedFrame.newTargeter();
            /* add */ (list.push(this.indexed) > 0);
            this.__indexing.setNotifiable(this);
            this.indexed.setNotifiable(this);
            this.__elements = ((a1, a2) => { if (a1.length >= a2.length) {
                a1.length = 0;
                a1.push.apply(a1, a2);
                return a1;
            }
            else {
                return a2.slice(0);
            } })([], list);
        }
        this.__indexing.retarget(ix);
        this.indexed.retarget(indexedFrame);
    }
    /**
     * Overrides superclass method.
     */
    retargetFacets() {
        super.retargetFacets();
        this.indexing().retargetFacets();
    }
}
IndexingFrameTargeter["__class"] = "fjs.core.select.IndexingFrameTargeter";
IndexingFrameTargeter["__interfaces"] = ["fjs.util.Identified", "fjs.core.Notifying", "fjs.core.SRetargetable", "fjs.core.Notifiable", "fjs.util.Titled", "fjs.core.Facetable", "fjs.core.STargeter"];

/**
 * {@link TargetCore} that enables editing of the contents of an {@link SIndexing}.
 * @extends TargetCore
 * @class
 */
class IndexingFrame extends TargetCore {
    constructor(title, indexing) {
        super(title);
        this.__indexing = null;
        if (indexing == null)
            throw Object.defineProperty(new Error("Null indexing in " + Debug.info(this)), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.Object', 'java.lang.RuntimeException', 'java.lang.IllegalArgumentException', 'java.lang.Exception'] });
        this.__indexing = indexing;
        indexing.setNotifiable(this);
    }
    /**
     * <p>Returns the {@link SFrameTarget} created in {@link #newIndexedFrame(Object)}.
     * @return {SFrameTarget}
     */
    indexedFrame() {
        return this.newIndexedFrame(this.__indexing.indexed());
    }
    /**
     * The indexing passed to the constructor.
     * @return {SIndexing}
     */
    indexing() {
        return this.__indexing;
    }
    /**
     * Overrides superclass method.
     * <p>Returns an {@link IndexingFrameTargeter}.
     * @return {*}
     */
    newTargeter() {
        return new IndexingFrameTargeter(this);
    }
    /**
     * Re-implementation returning <code>true</code>.
     * @return {boolean}
     */
    notifiesTargeter() {
        return true;
    }
}
IndexingFrame["__class"] = "fjs.core.select.IndexingFrame";
IndexingFrame["__interfaces"] = ["fjs.core.STarget", "fjs.util.Identified", "fjs.core.Notifying", "fjs.core.Notifiable", "fjs.util.Titled"];

/* Generated from Java with JSweet 2.0.0-rc1 - http://www.jsweet.org */
class Times {
    static minute_$LI$() { if (Times.minute == null)
        Times.minute = 1000 * 60; return Times.minute; }
    ;
    static hour_$LI$() { if (Times.hour == null)
        Times.hour = Times.minute_$LI$() * 60; return Times.hour; }
    ;
    /*private*/ static newMillis() {
        return Date.now();
    }
    static setResetWait(wait) {
        if (Times.debug)
            Util.printOut$java_lang_String$java_lang_Object("Times.setResetWait: wait=", wait);
        Times.start = Times.newMillis();
        Times.times = true;
        Times.resetWait = wait;
    }
    /**
     * The time since the last auto-reset.
     * <p>Interval for reset set by {@link #resetWait}.
     * @return {number}
     */
    static elapsed() {
        let now = Times.newMillis();
        if (now - Times.then > Times.resetWait) {
            Times.start = now;
            Times.restarted = true;
            if (Times.debug)
                Util.printOut$java_lang_String("Times: reset resetWait=" + Times.resetWait);
        }
        else
            Times.restarted = false;
        return (Times.then = now) - Times.start;
    }
    /**
     * Print {@link #elapsed()} followed by the message.
     * @param {string} msg
     */
    static printElapsed(msg) {
        if (!Times.times) {
            if (!Debug.trace) {
                Times.start = Times.then = Times.newMillis();
                if (Times.debug)
                    Util.printOut$java_lang_String$java_lang_Object("Times.printElapsed: times=", Times.times);
            }
            return;
        }
        let elapsed = Times.elapsed();
        let elapsedText = true && elapsed > 5 * 1000 ? (Util.fxs(elapsed / 1000.0)) : ("" + elapsed);
        let toPrint = (Times.restarted ? "\n" : "") + elapsedText + (msg != null ? ":\t" + msg : "");
        Util.printOut$java_lang_String(toPrint);
    }
}
Times.times = false;
Times.nanoTime = true;
Times.resetWait = 1000;
Times.then = 0;
Times.start = 0;
Times.restarted = false;
Times.debug = false;
Times["__class"] = "fjs.util.Times";
Times.hour_$LI$();
Times.minute_$LI$();

class Facets extends Tracer {
    constructor(top, trace) {
        super(top);
        /*private*/ this.titleTargeters = ({});
        /*private*/ this.notifiable = new Facets.Facets$0(this);
        this.doTrace = false;
        this.targeterTree = null;
        this.retargeted = null;
        this.doTrace = trace;
    }
    attachOnRetargeted(retargeted) {
        this.retargeted = (retargeted);
    }
    onRetargeted() {
        if (this.retargeted != null) {
            this.trace$java_lang_String("> Calling onRetargeted...");
            (target => (typeof target === 'function') ? target(null) : target.accept(null))(this.retargeted);
        }
    }
    /**
     *
     * @param {string} msg
     */
    traceOutput(msg) {
        if (this.doTrace || (Debug.trace && ((str, searchString, position = 0) => str.substr(position, searchString.length) === searchString)(msg, ">>")))
            super.traceOutput(msg);
    }
    newTextualTarget(title, c) {
        let textual = new STextual(title, new Facets.Facets$1(this, c));
        let passText = c.passText;
        if (passText != null)
            textual.setText(passText);
        this.trace$java_lang_String$java_lang_Object(" > Created textual ", textual);
        return textual;
    }
    newTogglingTarget(title, c) {
        let passSet = c.passSet;
        if (passSet == null)
            throw Object.defineProperty(new Error("Null passSet for " + title), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.IllegalStateException', 'java.lang.Object', 'java.lang.RuntimeException', 'java.lang.Exception'] });
        let toggling = new SToggling(title, passSet, new Facets.Facets$2(this, c));
        this.trace$java_lang_String$java_lang_Object(" > Created toggling ", toggling);
        return toggling;
    }
    newNumericTarget(title, c) {
        let numeric = new SNumeric(title, c.passValue, new Facets.Facets$3(this, c));
        this.trace$java_lang_String$java_lang_Object(" > Created numeric ", numeric);
        return numeric;
    }
    newTriggerTarget(title, c) {
        return new STrigger(title, new Facets.Facets$4(this, c));
    }
    newTargetGroup(title, ...members) {
        let group = new (__Function$1.prototype.bind.apply(TargetCore, [null, title].concat(members)));
        this.trace$java_lang_String$java_lang_Object(" > Created target group " + Debug.info(group) + " ", members);
        return group;
    }
    updatedTarget(target, c) {
        let title = target.title();
        this.trace$java_lang_String$java_lang_Object(" > Updated target ", target);
        if (c.targetStateUpdated != null) {
            let state = target.state();
            (target => (typeof target === 'function') ? target(title, state) : target.accept(title, state))(c.targetStateUpdated);
        }
    }
    newIndexingTarget(title, c) {
        let indexing = new SIndexing(title, new Facets.Facets$5(this, c));
        let passIndex = c.passIndex;
        if (passIndex == null)
            throw Object.defineProperty(new Error("Null passIndex for " + title), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.IllegalStateException', 'java.lang.Object', 'java.lang.RuntimeException', 'java.lang.Exception'] });
        else
            indexing.setIndex(passIndex);
        this.trace$java_lang_String$java_lang_Object(" > Created indexing ", indexing);
        return indexing;
    }
    getIndexingState(title) {
        let titleTarget = this.titleTarget(title);
        if (titleTarget == null)
            throw Object.defineProperty(new Error("Null target for " + title), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.IllegalStateException', 'java.lang.Object', 'java.lang.RuntimeException', 'java.lang.Exception'] });
        let indexing = titleTarget;
        return Object.defineProperty({
            uiSelectables: indexing.facetIndexables(),
            indexed: indexing.indexed()
        }, '__interfaces', { configurable: true, value: ["fjs.globals.Facets.IndexingState"] });
    }
    buildSelectingFrame(p) {
        let indexing = new SIndexing(p.indexingTitle, new Facets.Facets$6(this, p));
        indexing.setIndex(0);
        p.getIndexedContent = ((indexing) => {
            return () => indexing.indexed();
        })(indexing);
        p.frame = new Facets.Facets$7(this, p.title, indexing, p);
        this.trace$java_lang_String$java_lang_Object(" > Defined frame ", p.frame);
        return p.frame;
    }
    buildTargeterTree(targetTree) {
        this.trace$java_lang_String$java_lang_Object(" > Initial retargeting on ", targetTree);
        this.targeterTree = targetTree.newTargeter();
        this.targeterTree.setNotifiable(this.notifiable);
        this.targeterTree.retarget(targetTree);
        this.addTitleTargeters(this.targeterTree);
        this.onRetargeted();
    }
    addTitleTargeters(t) {
        let title = t.title();
        let then = (this.titleTargeters[title] = t);
        let elements = t.elements();
        this.trace$java_lang_String("> Added targeter: title=" + title + ": elements=" + elements.length);
        for (let index140 = 0; index140 < elements.length; index140++) {
            let e = elements[index140];
            this.addTitleTargeters(e);
        }
    }
    attachFacet(title, facetUpdated) {
        if (facetUpdated == null)
            throw Object.defineProperty(new Error("Null facetUpdated for " + title), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.Object', 'java.lang.RuntimeException', 'java.lang.IllegalArgumentException', 'java.lang.Exception'] });
        else if (title == null || ((o1, o2) => { if (o1 && o1.equals) {
            return o1.equals(o2);
        }
        else {
            return o1 === o2;
        } })(title, ""))
            throw Object.defineProperty(new Error("Null or empty title for " + facetUpdated), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.Object', 'java.lang.RuntimeException', 'java.lang.IllegalArgumentException', 'java.lang.Exception'] });
        let targeter = ((m, k) => m[k] ? m[k] : null)(this.titleTargeters, title);
        if (targeter == null)
            throw Object.defineProperty(new Error("Null targeter for " + title), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.Object', 'java.lang.RuntimeException', 'java.lang.IllegalArgumentException', 'java.lang.Exception'] });
        let facet = new Facets.Facets$8(this, facetUpdated);
        this.trace$java_lang_String$java_lang_Object(" > Attaching facet " + facet + " to", targeter);
        targeter.attachFacet(facet);
    }
    titleTarget(title) {
        let targeter = ((m, k) => m[k] ? m[k] : null)(this.titleTargeters, title);
        return targeter == null ? null : targeter.target();
    }
    updateTargetState(title, update) {
        this.trace$java_lang_String$java_lang_Object(" > Updating target state for title=" + title + " update=", update);
        let target = this.titleTarget(title);
        if (target == null)
            throw Object.defineProperty(new Error("Null target for " + title), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.IllegalStateException', 'java.lang.Object', 'java.lang.RuntimeException', 'java.lang.Exception'] });
        target.updateState(update);
        target.notifyParent();
    }
    getTargetState(title) {
        let target = this.titleTarget(title);
        if (target == null)
            return null;
        let state = target.state();
        this.trace$java_lang_String$java_lang_Object(" > Getting target state for title=" + title + " state=", state);
        return state;
    }
    setTargetLive(title, live) {
        let target = this.titleTarget(title);
        if (target == null)
            throw Object.defineProperty(new Error("Null target for " + title), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.IllegalStateException', 'java.lang.Object', 'java.lang.RuntimeException', 'java.lang.Exception'] });
        else
            target.setLive(live);
    }
    isTargetLive(title) {
        let target = this.titleTarget(title);
        if (target == null)
            throw Object.defineProperty(new Error("Null target for " + title), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.IllegalStateException', 'java.lang.Object', 'java.lang.RuntimeException', 'java.lang.Exception'] });
        else
            return target.isLive();
    }
}
Facets["__class"] = "fjs.globals.Facets";
Facets["__interfaces"] = ["fjs.util.Identified"];
(function (Facets) {
    class Facets$0 {
        constructor(__parent) {
            this.__parent = __parent;
        }
        /**
         *
         * @param {*} notice
         */
        notify(notice) {
            let msg = "> Surface for " + Debug.info(this.__parent.targeterTree) + " notified by " + notice;
            if (Times.times)
                Times.printElapsed(msg);
            else
                this.__parent.trace(msg);
            let targets = this.__parent.targeterTree.target();
            this.__parent.targeterTree.retarget(targets);
            this.__parent.trace("> Targeters retargeted on ", targets);
            this.__parent.onRetargeted();
            this.__parent.targeterTree.retargetFacets();
            msg = "> Facets retargeted in " + Debug.info(this.__parent.targeterTree);
            if (Times.times)
                Times.printElapsed(msg);
            else
                this.__parent.trace(msg);
        }
        /**
         *
         * @return {string}
         */
        title() {
            throw Object.defineProperty(new Error("Not implemented in " + this), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.Object', 'java.lang.RuntimeException', 'java.lang.Exception'] });
        }
    }
    Facets.Facets$0 = Facets$0;
    Facets$0["__interfaces"] = ["fjs.core.Notifiable", "fjs.util.Titled"];
    class Facets$1 extends STextual.Coupler {
        constructor(__parent, c) {
            super();
            this.c = c;
            this.__parent = __parent;
        }
        /**
         *
         * @param {STextual} target
         */
        textSet(target) {
            this.__parent.updatedTarget(target, this.c);
        }
        /**
         *
         * @param {STextual} t
         * @return {string}
         */
        getText(t) {
            let getText = (this.c.getText);
            let title = t.title();
            if (getText == null)
                throw Object.defineProperty(new Error("Null getText for " + title), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.IllegalStateException', 'java.lang.Object', 'java.lang.RuntimeException', 'java.lang.Exception'] });
            else
                return (target => (typeof target === 'function') ? target(title) : target.apply(title))(getText);
        }
        /**
         *
         * @param {STextual} t
         * @param {string} text
         * @return {boolean}
         */
        isValidText(t, text) {
            let isValidText = (this.c.isValidText);
            return isValidText == null ? true : (target => (typeof target === 'function') ? target(t.title(), text) : target.test(t.title(), text))(isValidText);
        }
    }
    Facets.Facets$1 = Facets$1;
    Facets$1["__interfaces"] = ["fjs.util.Identified", "fjs.core.TargetCoupler", "java.io.Serializable"];
    class Facets$2 extends SToggling.Coupler {
        constructor(__parent, c) {
            super();
            this.c = c;
            this.__parent = __parent;
        }
        /**
         *
         * @param {SToggling} target
         */
        stateSet(target) {
            this.__parent.updatedTarget(target, this.c);
        }
    }
    Facets.Facets$2 = Facets$2;
    Facets$2["__interfaces"] = ["fjs.core.TargetCoupler", "java.io.Serializable"];
    class Facets$3 extends SNumeric.Coupler {
        constructor(__parent, c) {
            super();
            this.c = c;
            this.__parent = __parent;
        }
        /**
         *
         * @param {SNumeric} n
         */
        valueSet(n) {
            this.__parent.updatedTarget(n, this.c);
        }
        /**
         *
         * @param {SNumeric} n
         * @return {NumberPolicy}
         */
        policy(n) {
            let min = this.c.min != null ? this.c.min : Number.MIN_VALUE;
            let max = this.c.max != null ? this.c.max : Number.MAX_VALUE;
            return new NumberPolicy(min, this.c.max);
        }
    }
    Facets.Facets$3 = Facets$3;
    Facets$3["__interfaces"] = ["fjs.core.TargetCoupler", "java.io.Serializable"];
    class Facets$4 extends STrigger.Coupler {
        constructor(__parent, c) {
            super();
            this.c = c;
            this.__parent = __parent;
        }
        /**
         *
         * @param {STrigger} t
         */
        fired(t) {
            this.__parent.updatedTarget(t, this.c);
        }
    }
    Facets.Facets$4 = Facets$4;
    Facets$4["__interfaces"] = ["fjs.core.TargetCoupler", "java.io.Serializable"];
    class Facets$5 extends SIndexing.Coupler {
        constructor(__parent, c) {
            super();
            this.c = c;
            this.__parent = __parent;
        }
        /**
         *
         * @param {SIndexing} i
         * @return {Array}
         */
        getIndexables(i) {
            return (target => (typeof target === 'function') ? target(i.title()) : target.apply(i.title()))(this.c.getIndexables);
        }
        /**
         *
         * @param {SIndexing} target
         */
        indexSet(target) {
            this.__parent.updatedTarget(target, this.c);
        }
        /**
         *
         * @param {SIndexing} i
         * @return {Array}
         */
        getFacetSelectables(i) {
            return (target => (typeof target === 'function') ? target(i.title()) : target.apply(i.title()))(this.c.getUiSelectables);
        }
    }
    Facets.Facets$5 = Facets$5;
    Facets$5["__interfaces"] = ["fjs.core.TargetCoupler", "java.io.Serializable"];
    class Facets$6 extends SIndexing.Coupler {
        constructor(__parent, p) {
            super();
            this.p = p;
            this.__parent = __parent;
            this.thenIndexables = null;
            this.thenSelectables = null;
        }
        /**
         *
         * @param {SIndexing} i
         * @return {Array}
         */
        getIndexables(i) {
            let got = this.p.content.slice(0);
            if (got == null)
                throw Object.defineProperty(new Error("Null got for " + i.title()), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.IllegalStateException', 'java.lang.Object', 'java.lang.RuntimeException', 'java.lang.Exception'] });
            let equal = Util.longEquals(got, this.thenIndexables);
            if (!equal)
                this.__parent.trace(".SIndexing.getIndexables: ", got);
            this.thenIndexables = got;
            return got;
        }
        /**
         *
         * @param {SIndexing} i
         * @return {Array}
         */
        getFacetSelectables(i) {
            let got = (target => (typeof target === 'function') ? target() : target.get())(this.p.getUiSelectables);
            if (got == null)
                throw Object.defineProperty(new Error("Null got for " + i.title()), '__classes', { configurable: true, value: ['java.lang.Throwable', 'java.lang.IllegalStateException', 'java.lang.Object', 'java.lang.RuntimeException', 'java.lang.Exception'] });
            let equal = Util.longEquals(got, this.thenSelectables);
            if (!equal)
                this.__parent.trace(".SIndexing.getFacetIndexables: ", got);
            this.thenSelectables = got;
            return got;
        }
    }
    Facets.Facets$6 = Facets$6;
    Facets$6["__interfaces"] = ["fjs.core.TargetCoupler", "java.io.Serializable"];
    class Facets$7 extends IndexingFrame {
        constructor(__parent, __arg0, __arg1, p) {
            super(__arg0, __arg1);
            this.p = p;
            this.__parent = __parent;
        }
        lazyElements() {
            let supplier = (this.p.newFrameTargets);
            let got = (target => (typeof target === 'function') ? target() : target.get())(supplier);
            this.trace$java_lang_String$java_lang_Object(".lazyElements: ", got);
            return got == null ? [] : STarget.newTargets(got);
        }
        /**
         *
         * @param {*} indexed
         * @return {SFrameTarget}
         */
        newIndexedFrame(indexed) {
            this.trace$java_lang_String(".newIndexedFrame: indexed=" + (indexed != null));
            let editTargets = (this.p.newEditTargets);
            return new Facets$7.Facets$7$0(this, this.p.title + ":indexed", indexed, editTargets, indexed);
        }
    }
    Facets.Facets$7 = Facets$7;
    Facets$7["__interfaces"] = ["fjs.core.STarget", "fjs.util.Identified", "fjs.core.Notifying", "fjs.core.Notifiable", "fjs.util.Titled"];
    (function (Facets$7) {
        class Facets$7$0 extends SFrameTarget {
            constructor(__parent, __arg0, __arg1, editTargets, indexed) {
                super(__arg0, __arg1);
                this.editTargets = editTargets;
                this.indexed = indexed;
                this.__parent = __parent;
            }
            /**
             *
             * @return {Array}
             */
            lazyElements() {
                let targets = (target => (typeof target === 'function') ? target(this.indexed) : target.apply(this.indexed))(this.editTargets);
                this.trace$java_lang_String$java_lang_Object(".newIndexedFrame.lazyElements: targets=", targets);
                return STarget.newTargets(targets);
            }
        }
        Facets$7.Facets$7$0 = Facets$7$0;
        Facets$7$0["__interfaces"] = ["fjs.core.STarget", "fjs.util.Identified", "fjs.core.Notifying", "fjs.core.Notifiable", "fjs.util.Titled"];
    })(Facets$7 = Facets.Facets$7 || (Facets.Facets$7 = {}));
    class Facets$8 {
        constructor(__parent, facetUpdated) {
            this.facetUpdated = facetUpdated;
            this.__parent = __parent;
            this.id = Tracer.ids++;
        }
        /**
         *
         * @param {*} target
         */
        retarget(target) {
            let state = target.state();
            let title = target.title();
            this.__parent.trace(" > Updating UI for \'" + title + "\' with state=", state);
            (target => (typeof target === 'function') ? target(state) : target.accept(state))(this.facetUpdated);
        }
        /**
         *
         * @return {string}
         */
        toString() {
            return "#" + this.__parent.id;
        }
    }
    Facets.Facets$8 = Facets$8;
    Facets$8["__interfaces"] = ["fjs.core.SRetargetable", "fjs.core.SFacet"];
})(Facets || (Facets = {}));
var __Function$1 = Function;

/* Generated from Java with JSweet 2.0.0-rc1 - http://www.jsweet.org */
function newInstance(trace) {
    return new Facets("Facets", trace);
}

exports.newInstance = newInstance;

}((this.Facets = this.Facets || {})));
//# sourceMappingURL=Facets.js.map
