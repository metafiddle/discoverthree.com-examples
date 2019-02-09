
function initScene() {

  const app = new THREE_APP( '#container' );

  app.init();


  app.scene.background = new THREE.Color( 0x8FBCD4 );
  app.camera.position.set( -50, 10, 50 );

  setupRenderer( app.renderer );

  createMeshes( app.scene );
  loadModels( app.scene );


  app.start();
}

initScene();