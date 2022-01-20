new window.ScrollBar({
  target: document.getElementById('vertical'),
  // Horizontal is false by default, no need to specify it here
  style: {
    color: 'blue',
    size: '5px',
    radius: '2px',
    lowOpacity: '0', 
    highOpacity: '.8',
    transitionDuration: '1.2s'
  }
});

new window.ScrollBar({
  target: document.getElementById('horizontal'),
  horizontal: true,
  minSize: 90
});
