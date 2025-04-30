class FormHandler {
  constructor(form) {
    this.form = form;
  }

  // Get all form values as an object
  getValues() {
    const formData = new FormData(this.form);
    console.log(formData);
    const values = {};

    for (const [key, value] of formData.entries()) {
      values[key] = value;
    }

    return values;
  }

  // Get a single value by input name
  getValue(name) {
    const el = this.form.querySelector[`[name="${name}"]`];
    return el.value;
  }

  // Set form values from an object
  setValues(data) {
    Object.entries(data).forEach(([name, value]) => {
      const input = this.form.querySelector(`[name="${name}"]`);
      if (input.nodeName === "NORD-CHECKBOX") {
        input.checked = !!value;
        return;
      }
      if (input) input.value = value;
    });
  }
}

export default FormHandler;
