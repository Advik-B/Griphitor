function modalOpen(target, title, url, bgcolor) {
  var bgcolor = bgcolor || 'black';    
  var options = {
    autoOpen: true,
    background: bgcolor,
    iconColor: 'green',
    borderBottom: false,
    timeoutProgressbar: true,
    theme: 'dark',
    title: title,
    iframe: true,
    iframeURL: url
  };
  $(target).iziModal('destroy');
  $(target).iziModal(options);
};