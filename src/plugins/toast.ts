export default {
  install: (app: any) => {
    const ele = document.createElement('div');
    ele.id = 'toast-container';
    document.body.appendChild(ele);

    app.provide('toast', (type: string, message: string, time = 2500) => {
      const toastEle = document.createElement('div');
      toastEle.className = 'toast-item ' + type;
      toastEle.textContent = message;
      ele.appendChild(toastEle);
      setTimeout(() => {
        ele.removeChild(toastEle);
      }, time);
    });
  }
};
