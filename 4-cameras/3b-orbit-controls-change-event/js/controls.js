function initOverlay() {

  const overlay = document.querySelector( '#overlay' );

  overlay.addEventListener( 'click', () => {

    overlay.style.display = 'none';

  } );

}

export default function setupCameraControls( app ) {

  // call control.update()
  // to move the camera into the correct position
  // we could also use camera.lookat( 0, 0, 0 )
  app.controls.update();

  initOverlay();

  app.controls.addEventListener( 'change', () => {

    app.update();
    app.render();

  } );

}
