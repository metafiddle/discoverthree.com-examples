async function initScene() {

  const app = new THREE_APP( '#container' );

  app.init();

  app.scene.background = new THREE.Color( 0x8FBCD4 );
  app.camera.position.set( -20, 30, 30 );

  setupRenderer( app.renderer );

  const lights = createLights();
  app.scene.add( lights.ambient, lights.main );

  app.scene.add( new THREE.PointLightHelper( lights.main ) );
  app.scene.add( new THREE.CameraHelper( lights.main.shadow.camera ) );

  const meshes = createMeshes();
  app.scene.add( meshes.plinth, meshes.shapes );

  const models = await loadModels();
  app.scene.add( ...models.horsesArray );

  app.start();
}

initScene();