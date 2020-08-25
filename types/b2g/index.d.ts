/**
 * Types for KaiOS runtime APIs
 * 
 * 
 * https://developer.mozilla.org/en-US/docs/Archive/B2G_OS/API
 */


 /**
  * DOMRequest interface
  * 
  * https://developer.mozilla.org/en-US/docs/Archive/B2G_OS/API/DOMRequest
  */
 interface DOMRequest<T> {

    /**
     * A callback handler called when the operation represented by the DOMRequest is completed.
     */
    onsuccess: Function;

    /**
     * A callback handler that gets called when an error occurs while processing the operation.
     */
    onerror: Function;

    /**
     * A string indicating whether or not the operation is finished running. Its value is either "done" or "pending".
     */
    readyState: string;

    /**
     * The operation's result.
     */
    result: T;

    /**
     * Error information, if any. 
     */
    error: DOMError;
 }

 interface DOMCursor<T> extends DOMRequest<T> {

    /**
     * A boolean indicating if the cursor has reached the last result.
     */
     done: boolean;

     /**
      * Moves the cursor to the next result.
      */
     continue: Function;
 }

 interface ContactField {
     type: Array<string>;
     value: string;
     pref: boolean;
 }

 interface TelField extends ContactField {
     carrier: string;
 }

 interface AdrField extends Omit<ContactField, 'value'> {
    streetAddress: string,
    locality: string,
    region: string,
    postalCode: string,
    countryName: string
 }


/**
 * MozContact interface
 * 
 * https://developer.mozilla.org/en-US/docs/Archive/B2G_OS/API/MozContact
 */
interface MozContact {
    id: string; 
    published: string; 
    updated: string; 
    name: Array<string>;
    givenName: Array<string>;
    familyName: Array<string>;
    honorificSuffix: Array<string>;
    nickname: Array<string>;
    email: Array<ContactField>;
    photo: Array<Blob>;
    url: Array<ContactField>;
    category: Array<string>;
    adr: Array<AdrField>; // address field
    tel: Array<TelField>; // tel field
    org: Array<string>;
    jobTitle: Array<string>;
    bday: Date;
    note: Array<string>;
    impp: Array<ContactField>;
    anniversary: Date;
    sex: string; 
    genderIdentity: string; 
    key: Array<string>;

    new(data?: object): MozContact;
}

/**
 * ContactManager
 * 
 * https://developer.mozilla.org/en-US/docs/Archive/B2G_OS/API/ContactManager
 */
interface ContactManager {

    clear(): DOMRequest<any>;

    find(options?: {
        filterBy: Array<string>,
        filterValue: string,
        filterOp: string,
        filterLimit: number,
    }): DOMRequest<any>;

    getAll(options?: {
        sortBy: string,
        sortOrder: string,
        filterBy: Array<string>,
        filterValue: string,
        filterOp: string,
        filterLimit: number,
    }): DOMCursor<MozContact>;

    getCount(): DOMRequest<number>;

    getRevision(): DOMRequest<any>;

    remove(contact: MozContact): DOMRequest<any>;

    save(contact: MozContact): DOMRequest<any>;
}

interface MozAlarm {
    id: number;
    date: Date;
    respectTimezone: string;
    data: {};
}

/**
 * MozAlarmsManager
 * 
 * https://developer.mozilla.org/en-US/docs/Archive/B2G_OS/API/MozAlarmsManager
 */
interface MozAlarmsManager {
  getAll(): DOMRequest<Array<MozAlarm>>;
  add(date: Date, respectTimezone: string, data?: {}): DOMRequest<number>;
  remove(id: number): void;
}



/**
 * TelephonyCall
 * 
 * https://developer.mozilla.org/en-US/docs/Archive/B2G_OS/API/TelephonyCall
 */
interface TelephonyCall {
    // @todo
}

interface TelephonyCallGroup {

}


interface MozMMIResult {
    // @todo
}

/**
 * MMICall
 * 
 * https://developer.mozilla.org/en-US/docs/Archive/B2G_OS/API/MMICall
 */
interface MMICall {
    result: Promise<MozMMIResult>
}

/**
 * Telephony
 * 
 * https://developer.mozilla.org/en-US/docs/Archive/B2G_OS/API/Telephony
 */
interface Telephony {
    // properties
    active: TelephonyCall;
    calls: Array<TelephonyCall>
    conferenceGroup: TelephonyCallGroup;
    muted: boolean;
    ready: Promise<void>;
    speakerEnabled: boolean;

    // handlers @todo
    
    // methods
    dial(number: string, serviceId?: string): Promise<TelephonyCall | MMICall>;
    dialEmergency(number: string, serviceId?: string): Promise<TelephonyCall>;
    ownAudioChannel(): void;
    sendTones(dtmfChars: string, pauseDuration?: number, toneduration?: number, serviceId?: string): Promise<void>
    startTone(drmfChar: string): void;
    stopTone(dtmfChar: string): void;
}

interface SettingsLock {
    // properties
    closed: boolean;

    // methods
    set(settings: {}): DOMRequest<void>;
    get(settingName: string): DOMRequest<any>;
    clear(): DOMRequest<void>;
}


/**
 * SettingsManager
 * 
 * https://developer.mozilla.org/en-US/docs/Archive/B2G_OS/API/SettingsManager
 */
interface SettingsManager {
    // properties
    onsettingschage: Function; // @todo

    // methods
    createLock(): SettingsLock;
    addObserver(settingName: string, callback: Function): void;
    removeObserver(settingName: string, callback: Function): void;
}

interface MozMobileICCInfo {
    // properties
    iccid: string;
    isDisplayNetworkNameRequired: boolean;
    isDisplaySpnRequired: boolean;
    mcc: number;
    mnc: number;
    msisdn: string;
    spn: string;
}

interface MozMobileNetworkInfo {
    longName?: string;
    mcc?: string;
    mnc?: string;
    shortName?: string;
    state?: {}; // @todo MozMobileNetworkState
}

// @todo
interface MozIccManager extends EventTarget {
    // properties
    cardState: string;
    iccInfo: MozMobileICCInfo;

    iccCloseChannel(channel: number): DOMRequest<void>;
    iccExchangeAPDU(channel: number, apdu: object): DOMRequest<void>;
    iccOpenChannel(aid: string): DOMRequest<void>;
    sendStkEventDownload(event: object): void;
    sendStkMenuSelection(itemIdentifier: number, helpRequested: boolean): void;
    sendStkResponse(command: object, respond: object): void;
    sendStkTimerExpiration(timer: object): void;
    updateContact(contactType: string, contact: MozContact, pin2?: string): DOMRequest<void>;
    getCardLock(lockType: string): DOMRequest<void>;
    unlockCardLock(info: object): DOMRequest<void>;
    setCardLock(info: object): DOMRequest<void>;
  
  
    oncardstatechange: EventHandlerNonNull;
    oniccinfochange: EventHandlerNonNull;
    onstkcommand: EventHandlerNonNull;
    onstksessionend: EventHandlerNonNull;
}

/**
 * Multi-SIM API
 * 
 * https://wiki.mozilla.org/WebAPI/WebIccManager/Multi-SIM
 */
interface nsIDOMMozIccManager {
    // properties
    iccIds: Array<string>;

    getIccById(iccId: string): MozIccManager;
    oniccdetected: Function;
    oniccundetected: Function;
}

interface MozMobileConnection {
    // @todo
}


interface App {
    // properties
    manifest: {
        name: string;
        default_locale: string;
        installs_allowed_from: Array<string>;
        description: string;
        version: string;
        developer: {
            url: string;
            name: string;
        };
        origin: string;
        installTime: number;
        installOrigin: string;
        receipts: Array<string>;
    };
    manifestURL: string;
    origin: string;
    installOrigin: string;
    installTime: number;
    receipts: object | null;
    state: string; // enabled or disabled

    // methods @audit
    addReceipt(): void;
    launch(): void;
    checkForUpdate(): DOMRequest<void>;
    removeReceipt(): void;
    replaceReceipt(): void;
}

/**
 * Apps API
 * 
 * https://developer.mozilla.org/en-US/docs/Archive/Marketplace/API/App_installation_and_management_APIs
 */
interface MozApps {
    // @todo
    install(): void;
    installPackage(): void;
    getSelf(): DOMRequest<App>;
    getInstalled(): void;
    checkInstalled(): void;
}

interface Navigator {
    mozContacts: ContactManager;
    mozAlarms: MozAlarmsManager;
    mozTelephony: Telephony;
    mozSettings: SettingsManager;
    mozIccManager: nsIDOMMozIccManager;
    mozMobileConnections: MozMobileConnection;
    mozApps: MozApps;
}

interface Window {
    mozContact: MozContact
}
