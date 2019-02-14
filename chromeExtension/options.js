window.onload = function() {
  loadRules();
  document.getElementById('new').onclick = function() {
    new Rule();
  };
}

Rule.prototype.getElement = function(name) {
  return document.querySelector('#' + this.node.id + ' .' + name);
}

Rule.next_id = 0; //Global Rule ids counter

function loadRules() {
  var rules = localStorage.rules;
  try {
    JSON.parse(rules).forEach(function(rule) {
      new Rule(rule);
    });
  } catch (e) {
    console.log("Loading Rules has Failed");
    localStorage.rules = JSON.stringify([]);
  }
}


function Rule(data) {
  var rules = document.getElementById('rules');
  this.node = document.getElementById('rule-template').cloneNode(true); //deep cloning - also the children of the node should also be cloned
  this.node.id = 'rule' + (Rule.next_id++);
  this.node.rule = this;
  rules.appendChild(this.node);
  this.node.hidden = false;

  if (data) {
    this.getElement('fileTypeSlector').value = data.fileTypeSlector;
    this.getElement('ext-param').value = data.ext_param;
    this.getElement('action').value = data.action;
    this.getElement('enabled').checked = data.enabled;
  }

  this.getElement('enabled-label').htmlFor = this.getElement('enabled').id =
    this.node.id + '-enabled';


  this.getElement('fileTypeSlector').onchange = storeRules;
  this.getElement('ext-param').onkeyup = storeRules;
  this.getElement('action').onchange = storeRules;
  this.getElement('enabled').onchange = storeRules;

  var rule = this;

  this.getElement('remove').onclick = function() {
    rule.node.parentNode.removeChild(rule.node);
    storeRules();
  };

  storeRules();
}

//map each existing Rule to a new Rule Object
function storeRules() {
  localStorage.rules = JSON.stringify(Array.prototype.slice.apply(document.getElementById('rules').childNodes).
  map(function(node) {
    return {fileTypeSlector: node.rule.getElement('fileTypeSlector').value,
            ext_param: node.rule.getElement('ext-param').value,
            action: node.rule.getElement('action').value,
            enabled: node.rule.getElement('enabled').checked
          };
  }));
}
