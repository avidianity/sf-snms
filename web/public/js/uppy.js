var uptarg = document.getElementById('drag-drop-area');
if (uptarg) {
	var uppy = Uppy.Core()
		.use(Uppy.Dashboard, {
			inline: true,
			target: uptarg,
			proudlyDisplayPoweredByUppy: false,
			theme: 'dark',
			width: 770,
			height: 210,
			plugins: ['Webcam'],
		})
		.use(Uppy.Tus, {
			endpoint: 'https://master.tus.io/files/',
		});
	uppy.on('complete', (result) => {
		console.log('Upload complete! We’ve uploaded these files:', result.successful);
	});
}
