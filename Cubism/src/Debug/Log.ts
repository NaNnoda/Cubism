export class Log {
    static debugFlag: boolean = true;

    static log(message: string, ...args: any[]): void {
        let s = message;
        if (args.length !== 0) {
            s += ": ";
        }

        // if (args.length > 2) {
        s += "\n";
        for (let i = 0; i < args.length; i++) {
            s += args[i] + "\n";
        }
        // } else {
        //     for (let i = 0; i < args.length; i++) {
        //         s += args[i] + " ";
        //     }
        // }
        console.log(s);
    }

    static logDebug(message: string, ...args: any[]): void {
        if (Log.debugFlag) {
            Log.log(message, ...args);
        }
    }

    static debug(message: string, ...args: any[]): void {
        if (Log.debugFlag) {
            console.log(message, ...args);
        }
    }
}