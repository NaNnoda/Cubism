export class StaticDemo {
    private static _instance: StaticDemo;

    private _demoFunctions: { [key: string]: DemoFunction } = {};

    selector: HTMLSelectElement = document.getElementById("selector") as HTMLSelectElement;
    codeText: HTMLTextAreaElement = document.getElementById("codeText") as HTMLTextAreaElement;
    updateButton: HTMLButtonElement = document.getElementById("update") as HTMLButtonElement;

    currDemoFunction: DemoFunction | null = null;

    // currentDemoName: string | null = null;

    private constructor() {
        this.initSelector();
        this.initCodeText();
        this.initUpdateButton();
    }

    initCodeText() {
        this.codeText.onchange = this.onCodeTextChange.bind(this);
        this.codeText.oninput = this.onCodeTextInput.bind(this);
    }

    initUpdateButton() {
        this.updateButton.onclick = this.updateButtonOnClick.bind(this);
    }

    updateButtonOnClick() {
        // this.updateCubism();
        this.updateCurrDemoFunction();
    }

    updateCurrDemoFunction() {
        console.log("updateCurrDemoFunction");
        let currName = this.selector.value;
        this._demoFunctions[currName].setFunctionThroughFormattedString(this.codeText.value) ;

        this.setCurrentDemoCode(this.selector.value);
    }


    onCodeTextInput() {
        console.log("code text input");
    }

    onCodeTextChange() {
        console.log("code text changed");
    }


    initSelector() {
        this.selector.onchange = this.onSelectorChange.bind(this);
        this.selector.onload = this.onSelectorChange.bind(this);
    }

    setCurrentDemoCode(name: string) {
        this.codeText.value = this._demoFunctions[name].toString();
        this.selector.value = name;

        this.currDemoFunction = this._demoFunctions[name];

        this.runCurrentDemo();
    }

    runCurrentDemo() {
        if (this.currDemoFunction) {
            this.currDemoFunction.run();
        }
    }

    /**
     * Add a demo function to the dict of demo functions
     * @param name
     * @param func
     */
    addDemoFunction(name: string, func: Function) {
        let option = document.createElement("option");
        option.text = name;
        this.selector.add(option);

        this._demoFunctions[name] = new DemoFunction(func);
        this.setCurrentDemoCode(name);
    }


    onSelectorChange() {
        let selected = this.selector.options[this.selector.selectedIndex].text;
        console.log(`selected: ${selected}`);
        // this.runDemo(selected);
        this.setCurrentDemoCode(selected);
    }

    createFunctionFromString(s: string) {
        return new Function(s) as () => void;
    }


    static get i() {
        if (!StaticDemo._instance) {
            StaticDemo._instance = new StaticDemo();
        }
        return StaticDemo._instance;
    }
}

class DemoFunction {
    func: Function;
    funcName: string;


    constructor(func: Function) {
        this.func = func;
        this.funcName = func.name;
    }

    toString() {
        return this.functionToFormattedString(this.funcName, this.func);
    }

    functionToFormattedString(funcName: string, func: Function) {
        let s = func.toString();
        // Remove the first and last line
        s = s.substring(s.indexOf("{") + 1, s.lastIndexOf("}"));
        // Remove the first tab
        s = s.replace(/\t/g, "");
        // Remove the first empty line
        s = s.replace(/^\s*\n/gm, "");
        // Remove the last empty line
        s = s.replace(/\n\s*$/gm, "");
        // Add a new line after each object
        s = s.replace(/;/g, ";\n");

        // // Remove first 2 spaces
        // s = s.replace(/^ {4}/gm, "");
        // Format the as JS function
        s = "function " + funcName + "() {\n" + s + "\n}";

        s += "\n";
        s += funcName + "();";
        return s;
    }

    setFunction(func: Function) {
        this.func = func;
    }

    setFunctionThroughFormattedString(s: string) {
        this.func = new Function(s);
    }

    toFunction(): Function {
        return this.func;
    }

    run() {
        this.func();
    }
}
