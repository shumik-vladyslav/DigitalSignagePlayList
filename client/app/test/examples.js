"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var dragula_directive_1 = require('./directives/dragula.directive');
var dragula_provider_1 = require('./providers/dragula.provider');
var ExampleA = (function () {
    function ExampleA() {
    }
    ExampleA = __decorate([
        core_1.Component({
            selector: 'example-a',
            directives: [dragula_directive_1.Dragula],
            viewProviders: [dragula_provider_1.DragulaService],
            template: "\n  <div class='parent'>\n    <label for='hy'>Move stuff between these two containers. Note how the stuff gets inserted near the mouse pointer? Great stuff.</label>\n    <div class='wrapper'>\n      <div class='container' [dragula]='\"first-bag\"'>\n        <div>You can move these elements between these two containers</div>\n        <div>Moving them anywhere else isn't quite possible</div>\n        <div>There's also the possibility of moving elements around in the same container, changing their position</div>\n      </div>\n      <div class='container' [dragula]='\"first-bag\"'>\n        <div>This is the default use case. You only need to specify the containers you want to use</div>\n        <div>More interactive use cases lie ahead</div>\n        <div>Make sure to check out the <a href='https://github.com/bevacqua/dragula#readme'>documentation on GitHub!</a></div>\n      </div>\n    </div>\n    <pre>\n      <code>\n&lt;div [dragula]=&#039;&quot;first-bag&quot;&#039;&gt;&lt;/div&gt;\n&lt;div [dragula]=&#039;&quot;first-bag&quot;&#039;&gt;&lt;/div&gt;\n      </code>\n    </pre>\n  </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], ExampleA);
    return ExampleA;
}());
exports.ExampleA = ExampleA;
var ExampleB = (function () {
    function ExampleB(dragulaService) {
        var _this = this;
        this.dragulaService = dragulaService;
        dragulaService.drag.subscribe(function (value) {
            //console.log(`drag: ${value[0]}`); // value[0] will always be bag name
            _this.onDrag(value.slice(1));
        });
        dragulaService.drop.subscribe(function (value) {
            //console.log(`drop: ${value[0]}`);
            _this.onDrop(value.slice(1));
        });
        dragulaService.over.subscribe(function (value) {
            //console.log(`over: ${value[0]}`);
            _this.onOver(value.slice(1));
        });
        dragulaService.out.subscribe(function (value) {
            //console.log(`out: ${value[0]}`);
            _this.onOut(value.slice(1));
        });
    }
    ExampleB.prototype.hasClass = function (el, name) {
        return new RegExp('(?:^|\\s+)' + name + '(?:\\s+|$)').test(el.className);
    };
    ExampleB.prototype.addClass = function (el, name) {
        if (!this.hasClass(el, name)) {
            el.className = el.className ? [el.className, name].join(' ') : name;
        }
    };
    ExampleB.prototype.removeClass = function (el, name) {
        if (this.hasClass(el, name)) {
            el.className = el.className.replace(new RegExp('(?:^|\\s+)' + name + '(?:\\s+|$)', 'g'), '');
        }
    };
    ExampleB.prototype.onDrag = function (args) {
        var e = args[0], el = args[1];
        this.removeClass(e, 'ex-moved');
    };
    ExampleB.prototype.onDrop = function (args) {
        var e = args[0], el = args[1];
        this.addClass(e, 'ex-moved');
    };
    ExampleB.prototype.onOver = function (args) {
        var e = args[0], el = args[1], container = args[2];
        this.addClass(el, 'ex-over');
    };
    ExampleB.prototype.onOut = function (args) {
        var e = args[0], el = args[1], container = args[2];
        this.removeClass(el, 'ex-over');
    };
    ExampleB = __decorate([
        core_1.Component({
            selector: 'example-b',
            directives: [dragula_directive_1.Dragula],
            viewProviders: [dragula_provider_1.DragulaService],
            template: "\n  <div class='parent'>\n    <label for='hy'>There are plenty of events along the lifetime of a drag event. <a href='https://github.com/bevacqua/dragula#drakeon-events'>all of them</a> in the docs!</label>\n    <div class='wrapper'>\n      <div class='container' [dragula]='\"second-bag\"'>\n        <div>As soon as you start dragging an element, a <code>drag</code> event is fired</div>\n        <div>Whenever an element is cloned because <code>copy: true</code>, a <code>cloned</code> event fires</div>\n        <div>The <code>shadow</code> event fires whenever the placeholder showing where an element would be dropped is moved to a different container or position</div>\n        <div>A <code>drop</code> event is fired whenever an element is dropped anywhere other than its origin <em>(where it was initially dragged from)</em></div>\n      </div>\n      <div class='container' [dragula]='\"second-bag\"'>\n        <div>If the element gets removed from the DOM as a result of dropping outside of any containers, a <code>remove</code> event gets fired</div>\n        <div>A <code>cancel</code> event is fired when an element would be dropped onto an invalid target, but retains its original placement instead</div>\n        <div>The <code>over</code> event fires when you drag something over a container, and <code>out</code> fires when you drag it away from the container</div>\n        <div>Lastly, a <code>dragend</code> event is fired whenever a drag operation ends, regardless of whether it ends in a cancellation, removal, or drop</div>\n      </div>\n    </div>\n    <pre>\n      <code>\n&lt;div [dragula]=&#039;&quot;second-bag&quot;&#039;&gt;&lt;/div&gt;\n&lt;div [dragula]=&#039;&quot;second-bag&quot;&#039;&gt;&lt;/div&gt;\n\nclass ExampleB {\n\n  constructor(private dragulaService: DragulaService) {\n    dragulaService.drag.subscribe((value) => {\n      this.onDrag(value.slice(1));\n    });\n    dragulaService.drop.subscribe((value) => {\n      this.onDrop(value.slice(1));\n    });\n    dragulaService.over.subscribe((value) => {\n      this.onOver(value.slice(1));\n    });\n    dragulaService.out.subscribe((value) => {\n      this.onOut(value.slice(1));\n    });\n  }\n\n  private hasClass(el: any, name: string) {\n    return new RegExp('(?:^|\\s+)' + name + '(?:\\s+|$)').test(el.className);\n  }\n\n  private addClass(el: any, name: string) {\n    if (!this.hasClass(el, name)) {\n      el.className = el.className ? [el.className, name].join(' ') : name;\n    }\n  }\n\n  private removeClass(el: any, name: string) {\n    if (this.hasClass(el, name)) {\n      el.className = el.className.replace(new RegExp('(?:^|\\s+)' + name + '(?:\\s+|$)', 'g'), '');\n    }\n  }\n\n  private onDrag(args) {\n    let [e, el] = args;\n    this.removeClass(e, 'ex-moved');\n  }\n\n  private onDrop(args) {\n    let [e, el] = args;\n    this.addClass(e, 'ex-moved');\n  }\n\n  private onOver(args) {\n    let [e, el, container] = args;\n    this.addClass(el, 'ex-over');\n  }\n\n  private onOut(args) {\n    let [e, el, container] = args;\n    this.removeClass(el, 'ex-over');\n  }\n}\n      </code>\n    </pre>\n  </div>\n  "
        }), 
        __metadata('design:paramtypes', [dragula_provider_1.DragulaService])
    ], ExampleB);
    return ExampleB;
}());
exports.ExampleB = ExampleB;
var AnotherExample = (function () {
    function AnotherExample(dragulaService) {
        this.dragulaService = dragulaService;
        dragulaService.setOptions('third-bag', {
            removeOnSpill: true
        });
    }
    AnotherExample = __decorate([
        core_1.Component({
            selector: 'another-example',
            directives: [dragula_directive_1.Dragula],
            viewProviders: [dragula_provider_1.DragulaService],
            template: "\n  <div class='parent'>\n    <label for='hy'>Need to be able to quickly delete stuff when it spills out of the chosen containers? Note how you can easily sort the items in any containers by just dragging and dropping.</label>\n    <div class='wrapper'>\n      <div class='container' [dragula]='\"third-bag\"'>\n        <div>Banana Boat</div>\n        <div>Orange Juice</div>\n        <div>Cuban Cigar</div>\n        <div>Terrible Comedian</div>\n        <div>Anxious Cab Driver</div>\n        <div>Thriving Venture</div>\n        <div>Calm Clam</div>\n      </div>\n    </div>\n    <pre>\n      <code>\n&lt;div [dragula]=&#039;&quot;third-bag&quot;&#039;&gt;&lt;/div&gt;\n\nclass AnotherExample {\n  constructor(private dragulaService: DragulaService) {\n    dragulaService.setOptions('third-bag', {\n      removeOnSpill: true\n    });\n  }\n}\n      </code>\n    </pre>\n  </div>\n  "
        }), 
        __metadata('design:paramtypes', [dragula_provider_1.DragulaService])
    ], AnotherExample);
    return AnotherExample;
}());
exports.AnotherExample = AnotherExample;
var SuchExample = (function () {
    function SuchExample(dragulaService) {
        this.dragulaService = dragulaService;
        dragulaService.setOptions('fourth-bag', {
            revertOnSpill: true
        });
    }
    SuchExample = __decorate([
        core_1.Component({
            selector: 'such-example',
            directives: [dragula_directive_1.Dragula],
            viewProviders: [dragula_provider_1.DragulaService],
            template: "\n  <div class='parent'>\n    <label for='hy'>By default, dropping an element outside of any known containers will keep the element in the last place it went over. You can make elements go back to origin if they're dropped outside of known containers, too.</label>\n    <div class='wrapper'>\n      <div class='container' [dragula]='\"fourth-bag\"'>\n        <div>Moving items between containers works as usual</div>\n        <div>If you try to drop an item outside of any containers, though, it'll retain its original position</div>\n        <div>When that happens, a <code>cancel</code> event will be raised</div>\n      </div>\n      <div class='container' [dragula]='\"fourth-bag\"'>\n        <div>Note that the dragged element will go back to the place you originally dragged it from, even if you move it over other containers</div>\n        <div>This is useful if you want to ensure drop events only happen when the user intends for them to happen explicitly, avoiding surprises</div>\n      </div>\n    </div>\n    <pre>\n      <code>\n&lt;div [dragula]=&#039;&quot;fourth-bag&quot;&#039;&gt;&lt;/div&gt;\n&lt;div [dragula]=&#039;&quot;fourth-bag&quot;&#039;&gt;&lt;/div&gt;\n\nclass SuchExample {\n  constructor(private dragulaService: DragulaService) {\n    dragulaService.setOptions('fourth-bag', {\n      revertOnSpill: true\n    });\n  }\n}\n      </code>\n    </pre>\n  </div>\n  "
        }), 
        __metadata('design:paramtypes', [dragula_provider_1.DragulaService])
    ], SuchExample);
    return SuchExample;
}());
exports.SuchExample = SuchExample;
var VeryExample = (function () {
    function VeryExample(dragulaService) {
        this.dragulaService = dragulaService;
        dragulaService.setOptions('fifth-bag', {
            copy: true
        });
    }
    VeryExample = __decorate([
        core_1.Component({
            selector: 'very-example',
            directives: [dragula_directive_1.Dragula],
            viewProviders: [dragula_provider_1.DragulaService],
            template: "\n  <div class='parent'>\n    <label for='hy'>Copying stuff is common too, so we made it easy for you.</label>\n    <div class='wrapper'>\n      <div class='container' [dragula]='\"fifth-bag\"'>\n        <div>When elements are copyable, they can't be sorted in their origin container</div>\n        <div>Copying prevents original elements from being dragged. A copy gets created and <em>that</em> gets dragged instead</div>\n        <div>Whenever that happens, a <code>cloned</code> event is raised</div>\n      </div>\n      <div class='container' [dragula]='\"fifth-bag\"'>\n        <div>Note that the clones get destroyed if they're not dropped into another container</div>\n        <div>You'll be dragging a copy, so when they're dropped into another container you'll see the duplication.</div>\n      </div>\n    </div>\n    <pre>\n      <code>\n&lt;div [dragula]=&#039;&quot;fifth-bag&quot;&#039;&gt;&lt;/div&gt;\n&lt;div [dragula]=&#039;&quot;fifth-bag&quot;&#039;&gt;&lt;/div&gt;\n\nclass VeryExample {\n  constructor(private dragulaService: DragulaService) {\n    dragulaService.setOptions('fifth-bag', {\n      copy: true\n    });\n  }\n}\n      </code>\n    </pre>\n  </div>\n  "
        }), 
        __metadata('design:paramtypes', [dragula_provider_1.DragulaService])
    ], VeryExample);
    return VeryExample;
}());
exports.VeryExample = VeryExample;
var MuchExample = (function () {
    function MuchExample(dragulaService) {
        this.dragulaService = dragulaService;
        dragulaService.setOptions('sixth-bag', {
            moves: function (el, container, handle) {
                return handle.className === 'handle';
            }
        });
    }
    MuchExample = __decorate([
        core_1.Component({
            selector: 'much-example',
            directives: [dragula_directive_1.Dragula],
            viewProviders: [dragula_provider_1.DragulaService],
            template: "\n  <div class='parent'>\n    <label for='hy'>Drag handles float your cruise?</label>\n    <div class='wrapper'>\n      <div class='container' [dragula]='\"sixth-bag\"'>\n        <div><span class='handle'>+</span>Move me, but you can use the plus sign to drag me around.</div>\n        <div><span class='handle'>+</span>Note that <code>handle</code> element in the <code>moves</code> handler is just the original event target.</div>\n      </div>\n      <div class='container' [dragula]='\"sixth-bag\"'>\n        <div><span class='handle'>+</span>This might also be useful if you want multiple children of an element to be able to trigger a drag event.</div>\n        <div><span class='handle'>+</span>You can also use the <code>moves</code> option to determine whether an element can be dragged at all from a container, <em>drag handle or not</em>.</div>\n      </div>\n    </div>\n    <pre>\n      <code>\n&lt;div [dragula]=&#039;&quot;sixth-bag&quot;&#039;&gt;&lt;/div&gt;\n&lt;div [dragula]=&#039;&quot;sixth-bag&quot;&#039;&gt;&lt;/div&gt;\n\nclass MuchExample {\n  constructor(private dragulaService: DragulaService) {\n    dragulaService.setOptions('sixth-bag', {\n      moves: function (el, container, handle) {\n        return handle.className === 'handle';\n      }\n    });\n  }\n}\n      </code>\n    </pre>\n    <div>There are a few similar mechanisms to determine whether an element can be dragged from a certain container <a href='https://github.com/bevacqua/dragula#optionsmoves'>(<code>moves</code>)</a>, whether an element can be dropped into a certain container at a certain position <a href='https://github.com/bevacqua/dragula#optionsaccepts'>(<code>accepts</code>)</a>, and whether an element is able to originate a drag event <a href='https://github.com/bevacqua/dragula#optionsinvalid'>(<code>invalid</code>)</a>.</div>\n  </div>\n  "
        }), 
        __metadata('design:paramtypes', [dragula_provider_1.DragulaService])
    ], MuchExample);
    return MuchExample;
}());
exports.MuchExample = MuchExample;
var WowExample = (function () {
    function WowExample() {
        this.clicked = {
            'one': false,
            'two': false,
            'three': false,
            'four': false,
            'five': false,
            'six': false,
            'seven': false
        };
    }
    WowExample.prototype.onclick = function (key) {
        var _this = this;
        this.clicked[key] = true;
        setTimeout(function () {
            _this.clicked[key] = false;
        }, 2000);
    };
    WowExample = __decorate([
        core_1.Component({
            selector: 'wow-example',
            directives: [dragula_directive_1.Dragula],
            viewProviders: [dragula_provider_1.DragulaService],
            template: "\n  <div class='parent'>\n    <label><strong>Click or Drag!</strong> Fires a click when the mouse button is released before a <code>mousemove</code> event, otherwise a drag event is fired. No extra configuration is necessary.</label>\n    <div class='wrapper'>\n      <div class='container' [dragula]='\"seventh-bag\"'>\n        <div (click)='onclick(\"one\")'>{{clicked.one ? \"Clicked!\" : \"Clicking on these elements triggers a regular click event you can listen to.\"}}</div>\n        <div (click)='onclick(\"two\")'>{{clicked.two ? \"Clicked!\" : \"Try dragging or clicking on this element.\"}}</div>\n        <div (click)='onclick(\"three\")'>{{clicked.three ? \"Clicked!\" : \"Note how you can click normally?\"}}</div>\n        <div (click)='onclick(\"four\")'>{{clicked.four ? \"Clicked!\" : \"Drags don't trigger click events.\"}}</div>\n        <div (click)='onclick(\"five\")'>{{clicked.five ? \"Clicked!\" : \"Clicks don't end up in a drag, either.\"}}</div>\n        <div (click)='onclick(\"six\")'>{{clicked.six ? \"Clicked!\" : \"This is useful if you have elements that can be both clicked or dragged.\"}}</div>\n        <div (click)='onclick(\"seven\")'>{{clicked.seven ? \"ZOMG, THAT TICKLES! PLEASE. STOP.\" : \"Business as usual.\"}}</div>\n      </div>\n    </div>\n    <pre>\n      <code>\n&lt;div [dragula]=&#039;&quot;seventh-bag&quot;&#039;&gt;&lt;/div&gt;\n\nclass WowExample {\n  public clicked: any = {\n    'one': false,\n    'two': false,\n    'three': false,\n    'four': false,\n    'five': false,\n    'six': false,\n    'seven': false\n  };\n\n  public onclick(key): void {\n    this.clicked[key] = true;\n    setTimeout(() => {\n      this.clicked[key] = false;\n    }, 2000);\n  }\n}\n      </code>\n    </pre>\n  </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], WowExample);
    return WowExample;
}());
exports.WowExample = WowExample;
var RepeatExample = (function () {
    function RepeatExample(dragulaService) {
        var _this = this;
        this.dragulaService = dragulaService;
        this.many = ['The', 'possibilities', 'are', 'endless!'];
        this.many2 = ['Explore', 'them'];
        dragulaService.dropModel.subscribe(function (value) {
            _this.onDropModel(value.slice(1));
        });
        dragulaService.removeModel.subscribe(function (value) {
            _this.onRemoveModel(value.slice(1));
        });
    }
    RepeatExample.prototype.onDropModel = function (args) {
        var el = args[0], target = args[1], source = args[2];
        console.log('onDropModel:');
        console.log(el);
        console.log(target);
        console.log(source);
    };
    RepeatExample.prototype.onRemoveModel = function (args) {
        var el = args[0], source = args[1];
        console.log('onRemoveModel:');
        console.log(el);
        console.log(source);
    };
    RepeatExample = __decorate([
        core_1.Component({
            selector: 'repeat-example',
            directives: [dragula_directive_1.Dragula],
            viewProviders: [dragula_provider_1.DragulaService],
            template: "\n  <div class='parent'>\n    <label for='hy'><strong>Angular-specific example.</strong> Fancy some <code>ngFor</code>?</label>\n    <div class='wrapper'>\n      <div class='container' [dragula]='\"another-bag\"' [dragulaModel]='many'>\n        <div *ngFor='let text of many' [innerHtml]='text'></div>\n      </div>\n      <div class='container' [dragula]='\"another-bag\"' [dragulaModel]='many2'>\n        <div *ngFor='let text of many2' [innerHtml]='text'></div>\n      </div>\n    </div>\n    <div class='wrapper'>\n      <div class='container'><pre>{{many | json}}</pre></div>\n      <div class='container'><pre>{{many2 | json}}</pre></div>\n    </div>\n    <pre>\n      <code>\n&lt;div class='wrapper'&gt;\n  &lt;div class='container' [dragula]='&quot;another-bag&quot;' [dragulaModel]='many'&gt;\n    &lt;div *ngFor='let text of many' [innerHtml]='text'&gt;&lt;/div&gt;\n  &lt;/div&gt;\n  &lt;div class='container' [dragula]='&quot;another-bag&quot;' [dragulaModel]='many2'&gt;\n    &lt;div *ngFor='let text of many2' [innerHtml]='text'&gt;&lt;/div&gt;\n  &lt;/div&gt;\n&lt;/div&gt;\n\nclass RepeatExample {\n  public many: Array&lt;string&gt; = ['The', 'possibilities', 'are', 'endless!'];\n  public many2: Array&lt;string&gt; = ['Explore', 'them'];\n}\n\nconstructor(private dragulaService: DragulaService) {\n  dragulaService.dropModel.subscribe((value) => {\n    this.onDropModel(value.slice(1));\n  });\n  dragulaService.removeModel.subscribe((value) => {\n    this.onRemoveModel(value.slice(1));\n  });\n}\n\nprivate onDropModel(args) {\n  let [el, target, source] = args;\n  // do something else\n}\n\nprivate onRemoveModel(args) {\n  let [el, source] = args;\n  // do something else\n}\n      </code>\n    </pre>\n  </div>\n  "
        }), 
        __metadata('design:paramtypes', [dragula_provider_1.DragulaService])
    ], RepeatExample);
    return RepeatExample;
}());
exports.RepeatExample = RepeatExample;
var NestedRepeatExample = (function () {
    function NestedRepeatExample() {
        this.groups = [
            {
                name: 'Group A',
                items: [{ name: 'Item A' }, { name: 'Item B' }, { name: 'Item C' }, { name: 'Item D' }]
            },
            {
                name: 'Group B',
                items: [{ name: 'Item 1' }, { name: 'Item 2' }, { name: 'Item 3' }, { name: 'Item 4' }]
            }
        ];
    }
    NestedRepeatExample = __decorate([
        core_1.Component({
            selector: 'nested-repeat-example',
            directives: [dragula_directive_1.Dragula],
            viewProviders: [dragula_provider_1.DragulaService],
            template: "\n  <div class='parent'>\n    <label for='hy'><strong>Angular-specific example.</strong> Fancy some nested <code>ngFor</code>?</label>\n    <div class='wrapper'>\n      <div class='container' *ngFor='let group of groups' [dragula]=\"'nested-bag'\">\n        <span>{{group.name}}</span>\n        <div *ngFor='let item of group.items' [innerHtml]='item.name'></div>\n      </div>\n    </div>\n    <pre>\n      <code>\n&lt;div class='wrapper'&gt;\n  &lt;div class='container' *ngFor='let group of groups' [dragula]='&quot;nested-bag&quot;'&gt;\n    &lt;div *ngFor='let item of group.items' [innerHtml]='item.name'&gt;&lt;/div&gt;\n  &lt;/div&gt;\n&lt;/div&gt;\n\nclass NestedRepeatExample {\n  public groups: Array&lt;any&gt; = [\n    {\n      name: 'Group A',\n      items: [{name: 'Item A'},{name: 'Item B'},{name: 'Item C'},{name: 'Item D'}]\n    },\n    {\n      name: 'Group B',\n      items: [{name: 'Item 1'},{name: 'Item 2'},{name: 'Item 3'},{name: 'Item 4'}]\n    }\n  ];\n}\n      </code>\n    </pre>\n  </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], NestedRepeatExample);
    return NestedRepeatExample;
}());
exports.NestedRepeatExample = NestedRepeatExample;
exports.EXAMPLES = [ExampleA, ExampleB, AnotherExample, SuchExample, VeryExample, MuchExample, WowExample, RepeatExample, NestedRepeatExample];
//# sourceMappingURL=examples.js.map