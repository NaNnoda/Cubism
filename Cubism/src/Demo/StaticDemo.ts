import {CubismOuterGlobal} from "../Global/Outer/CubismOuterGlobal";

export class StaticDemo {
    private static _instance: StaticDemo;

    private _demoFunctions: { [key: string]: DemoFunction } = {};

    selector: HTMLSelectElement = document.getElementById("selector") as HTMLSelectElement;
    codeText: HTMLTextAreaElement = document.getElementById("codeText") as HTMLTextAreaElement;

    controlDiv: HTMLDivElement = document.getElementById("controlDiv") as HTMLDivElement;

    currDemoFunction: DemoFunction | null = null;

    hotReloadCheckbox: HTMLInputElement | null = null;
    updateButton: HTMLButtonElement | null = null;

    // currentDemoName: string | null = null;

    private constructor() {
        this.initSelector();
        this.initCodeText();
        this.resetControlsDiv();
    }

    initControlDiv() {
        this.initHotReload();
        this.initUpdateButton();
    }

    resetControlsDiv() {
        this.controlDiv.innerHTML = "";
        this.initControlDiv();
    }

    initHotReload() {
        let hotReload = document.createElement("input");
        hotReload.type = "checkbox";
        hotReload.id = "hotReloadCheckbox";
        hotReload.checked = true;
        this.hotReloadCheckbox = hotReload;

        let hotReloadLabel = document.createElement("label");
        hotReloadLabel.htmlFor = "hotReloadCheckbox";
        hotReloadLabel.innerHTML = "Hot Reload";
        hotReloadLabel.style.marginRight = "10px";

        this.controlDiv.appendChild(hotReload);
        this.controlDiv.appendChild(hotReloadLabel);
    }

    initCodeText() {
        this.codeText.onchange = this.onCodeTextChange.bind(this);
        this.codeText.oninput = this.onCodeTextInput.bind(this);
    }

    initUpdateButton() {
        let updateButton = document.createElement("button");
        updateButton.innerHTML = "Reload";
        updateButton.onclick = this.updateButtonOnClick.bind(this);
        this.updateButton = updateButton;
        this.controlDiv.appendChild(updateButton);
    }

    updateButtonOnClick() {
        // this.updateCubism();
        this.updateCurrDemoFunction();
    }

    updateCurrDemoFunction() {
        console.log("updateCurrDemoFunction");
        CubismOuterGlobal.getCubismInstance("mainCanvas").destroy();
        let currName = this.selector.value;
        this._demoFunctions[currName].setFunctionThroughFormattedString(this.codeText.value);
        this.setCurrentDemoCode(this.selector.value);
        this.resetControlsDiv();
    }


    onCodeTextInput() {
        // console.log("code text input");
        if (this.hotReloadCheckbox && this.hotReloadCheckbox.checked) {
            this.updateCurrDemoFunction();
        }
    }

    onCodeTextChange() {
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
        this.setCurrentDemoCode(selected);
        this.updateCurrDemoFunction();
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
        // Add a new line after each object
        s = s.replace(/;/g, ";\n");

        // Remove empty line at the beginning
        s = s.replace(/^\s*\n/gm, "");
        // Remove empty line at the end
        s = s.replace(/\n\s*$/gm, "");

        let leadingSpacesCount = 0;
        if (s.length > 0) {
            while (s[leadingSpacesCount] === " ") {
                leadingSpacesCount++;
            }
        }

        // // Remove leading spaces
        let p = `^ {${leadingSpacesCount}}`;
        s = s.replace(new RegExp(p, "gm"), "");

        let lines = s.split("\n");

        let newString = "";
        for (let i = 0; i < lines.length; i++) {
            let line = lines[i];
            if (i == 0) {
                newString += line;
            } else {
                let currLeadingSpacesCount = 0;
                while (line[currLeadingSpacesCount] === " ") {
                    currLeadingSpacesCount++;
                }

                if (currLeadingSpacesCount ===0 && line.length > 0 && !(line[0] === "}" || line[0] === ")")) {
                    newString += `\n`;
                }

                let spaces = new Array(currLeadingSpacesCount + 5).join(" ");
                // console.log(`spaces: [${spaces}]`);
                // newString += "\n" + line;
                // Replace all spaces with 5 spaces

                let lineToAppend = line.replace(/\)\./gm, `)\n${spaces}.`);
                newString += "\n" + lineToAppend;
            }
        }

        return newString;
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