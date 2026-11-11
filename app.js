const $ = (id) => document.getElementById(id);
const setStatus = (id, msg, error=false) => { const el=$(id); el.textContent=msg; el.style.color=error?'#ff9baf':'#c9a4ef'; };
const downloadBlob = (blob, name) => { const url=URL.createObjectURL(blob); const a=document.createElement('a'); a.href=url; a.download=name; document.body.appendChild(a); a.click(); a.remove(); setTimeout(()=>URL.revokeObjectURL(url),1500); };
const safeName = (name, ext) => (name.replace(/\.[^.]+$/,'').replace(/[^a-z0-9_-]/gi,'_') || 'saraybelly-file') + ext;

$('year').textContent = new Date().getFullYear();
$('menuToggle').addEventListener('click',()=>{
  const isOpen=$('mainNav').classList.toggle('open');
  $('menuToggle').setAttribute('aria-expanded',String(isOpen));
  $('menuToggle').setAttribute('aria-label',isOpen?'Close navigation':'Open navigation');
});
document.querySelectorAll('#mainNav a').forEach(a=>a.addEventListener('click',()=>{
  $('mainNav').classList.remove('open');
  $('menuToggle').setAttribute('aria-expanded','false');
  $('menuToggle').setAttribute('aria-label','Open navigation');
}));
document.querySelectorAll('.tool-tab').forEach(btn=>btn.addEventListener('click',()=>{
  document.querySelectorAll('.tool-tab').forEach(b=>{b.classList.toggle('active',b===btn);b.setAttribute('aria-selected',b===btn?'true':'false')});
  document.querySelectorAll('.tool-panel').forEach(p=>p.classList.toggle('active',p.id==='panel-'+btn.dataset.tab));
}));

// Khmer/English lightweight interface toggle.
let khmer=false;
const translations={
  navMusic:['Music','ចម្រៀង'],navDeals:['For Artists','សម្រាប់សិល្បករ'],navTools:['Free Tools','ឧបករណ៍ឥតគិតថ្លៃ'],navAbout:['About','អំពីយើង'],navContact:['Contact','ទំនាក់ទំនង'],
  eyebrow:['KHMER ROOTS • GLOBAL RHYTHM','ឫសគល់ខ្មែរ • ចង្វាក់សកល'],
  heroCopy:['Meet Saray Belly and discover Khmer and English music made to stay with you.','ស្វែងយល់ពី Saray Belly និងស្តាប់បទចម្រៀងខ្មែរ និងអង់គ្លេសដ៏ពិរោះ។'],
  listenNow:['Listen to Saray Belly','ស្តាប់បទចម្រៀង Saray Belly'],tryTools:['Meet the Artist','ស្វែងយល់ពីសិល្បករ'],
  heroMeta:['Khmer & English • Always in rhythm','ខ្មែរ និងអង់គ្លេស • ចង្វាក់គ្រប់ពេល'],
  musicTitle:['Listen to Saray Belly','ស្តាប់បទចម្រៀង Saray Belly'],
  musicIntro:['Find songs, discover music videos and explore Saray Belly on your favorite platform.','ស្វែងរកបទចម្រៀង វីដេអូចម្រៀង និង Saray Belly នៅលើកម្មវិធីដែលអ្នកចូលចិត្ត។'],
  musicCardCopy:['Explore Khmer and English songs, music videos and new releases on YouTube.','ស្វែងរកបទចម្រៀងខ្មែរ និងអង់គ្លេស វីដេអូចម្រៀង និងបទថ្មីៗនៅលើ YouTube។'],
  youtubeButton:['Search Saray Belly on YouTube','ស្វែងរក Saray Belly នៅលើ YouTube'],
  youtubeNote:['Choose a music platform below to find Saray Belly.','ជ្រើសរើសកម្មវិធីស្តាប់ចម្រៀងខាងក្រោម ដើម្បីស្វែងរក Saray Belly។'],
  listenTitle:['Find your listening platform','ស្វែងរកកម្មវិធីស្តាប់ចម្រៀង'],
  listenIntro:['Choose a platform to discover Saray Belly\'s music.','ជ្រើសរើសកម្មវិធី ដើម្បីស្វែងរកបទចម្រៀងរបស់ Saray Belly។'],
  platformListen:['Listen to Saray Belly','ស្តាប់ Saray Belly'],
  platformNote:['These buttons open platform search results. Replace the links with official artist pages when available.','ប៊ូតុងទាំងនេះបើកលទ្ធផលស្វែងរកក្នុងកម្មវិធី។ សូមប្តូរ Link ទៅទំព័រសិល្បករផ្លូវការ នៅពេលមាន។'],
  dealsEyebrow:['FOR INDEPENDENT ARTISTS','សម្រាប់សិល្បករឯករាជ្យ'],
  dealsTitle:['Music distribution deals','ប្រូម៉ូសិនចែកចាយតន្ត្រី'],
  dealsIntro:['Explore these music distribution offers and choose the service that fits your release.','ស្វែងយល់ពីប្រូម៉ូសិនសេវាចែកចាយតន្ត្រី និងជ្រើសរើសសេវាដែលសមស្របសម្រាប់បទចម្រៀងរបស់អ្នក។'],
  distroOffer:['Get 50% off with the Saray Belly referral offer.','ទទួលបានការបញ្ចុះតម្លៃ ៥០% តាមរយៈ Referral របស់ Saray Belly។'],
  dittoOffer:['Get $10 back with the Saray Belly referral offer.','ទទួលបានប្រាក់ត្រឡប់មកវិញ ១០ ដុល្លារ តាមរយៈ Referral របស់ Saray Belly។'],
  tunecoreOffer:['Get 35% off with the Saray Belly referral offer.','ទទួលបានការបញ្ចុះតម្លៃ ៣៥% តាមរយៈ Referral របស់ Saray Belly។'],
  distroButton:['Get 50% off','ទទួលបានការបញ្ចុះតម្លៃ ៥០%'],
  dittoButton:['Get $10 back','ទទួលបានប្រាក់ត្រឡប់មកវិញ ១០ ដុល្លារ'],
  referralComingSoon:['Referral link coming soon','តំណ Referral នឹងមកដល់ឆាប់ៗនេះ'],
  dealsDisclaimer:['Offers and eligibility may change. Check each service\'s terms before signing up.','ប្រូម៉ូសិន និងលក្ខខណ្ឌអាចមានការផ្លាស់ប្តូរ។ សូមពិនិត្យលក្ខខណ្ឌរបស់សេវានីមួយៗមុនពេលចុះឈ្មោះ។'],
  toolsTitle:['Your creative toolbox','ឧបករណ៍សម្រាប់ការច្នៃប្រឌិត'],toolsIntro:['Choose a tool. Files are processed in your browser where supported.','ជ្រើសរើសឧបករណ៍។ ឯកសារត្រូវបានដំណើរការនៅក្នុង Browser របស់អ្នកសម្រាប់មុខងារដែលគាំទ្រ។'],
  aboutTitle:['Music that brings cultures together.','តន្ត្រីដែលនាំវប្បធម៌មកជួបគ្នា។'],
  aboutCopy:['Discover Saray Belly\'s Khmer and English songs, find music across your favorite platforms, and keep up with the latest videos and releases.','ស្វែងយល់ពីបទចម្រៀងខ្មែរ និងអង់គ្លេសរបស់ Saray Belly ស្វែងរកតន្ត្រីនៅលើកម្មវិធីដែលអ្នកចូលចិត្ត និងតាមដានវីដេអូ និងបទថ្មីៗ។']
};
$('langToggle').addEventListener('click',()=>{
  khmer=!khmer; $('langToggle').textContent=khmer?'English':'ខ្មែរ';
  document.documentElement.lang=khmer?'km':'en';
  document.querySelectorAll('[data-i18n]').forEach(el=>{const t=translations[el.dataset.i18n];if(t)el.textContent=t[khmer?1:0]});
});

// PDF tools powered by pdf-lib.
const pdfReady=()=>{if(!window.PDFLib)throw new Error('PDF library did not load. Check your internet connection and refresh.');return window.PDFLib;};
$('mergeBtn').addEventListener('click',async()=>{
  try{const files=[...$('mergeFiles').files];if(files.length<2)throw new Error('Choose at least two PDF files.');setStatus('mergeStatus','Merging PDFs…');const {PDFDocument}=pdfReady();const out=await PDFDocument.create();for(const f of files){const src=await PDFDocument.load(await f.arrayBuffer());const pages=await out.copyPages(src,src.getPageIndices());pages.forEach(p=>out.addPage(p));}downloadBlob(new Blob([await out.save()],{type:'application/pdf'}),'merged-saraybelly.pdf');setStatus('mergeStatus','Done — your merged PDF was downloaded.');}catch(e){setStatus('mergeStatus',e.message,true);}
});
$('splitBtn').addEventListener('click',async()=>{
  try{const f=$('splitFile').files[0];if(!f)throw new Error('Choose a PDF file.');const {PDFDocument}=pdfReady();const src=await PDFDocument.load(await f.arrayBuffer());const total=src.getPageCount();const spec=$('pageRange').value.trim();if(!spec)throw new Error('Enter pages, for example 1-3,5.');let nums=[];for(const part of spec.split(',')){const m=part.trim().match(/^(\d+)(?:\s*-\s*(\d+))?$/);if(!m)throw new Error('Invalid page range. Example: 1-3,5');let a=+m[1],b=+(m[2]||m[1]);if(a<1||b<a||b>total)throw new Error(`Page range must be between 1 and ${total}.`);for(let n=a;n<=b;n++)nums.push(n-1);}nums=[...new Set(nums)];const out=await PDFDocument.create();(await out.copyPages(src,nums)).forEach(p=>out.addPage(p));downloadBlob(new Blob([await out.save()],{type:'application/pdf'}),'split-saraybelly.pdf');setStatus('splitStatus',`Done — extracted ${nums.length} page(s).`);}catch(e){setStatus('splitStatus',e.message,true);}
});
$('imagesPdfBtn').addEventListener('click',async()=>{
  try{const files=[...$('imagesToPdf').files];if(!files.length)throw new Error('Choose one or more JPG/PNG images.');const {PDFDocument}=pdfReady();const pdf=await PDFDocument.create();for(const f of files){const bytes=await f.arrayBuffer();const img=f.type==='image/png'?await pdf.embedPng(bytes):await pdf.embedJpg(bytes);const page=pdf.addPage([img.width,img.height]);page.drawImage(img,{x:0,y:0,width:img.width,height:img.height});}downloadBlob(new Blob([await pdf.save()],{type:'application/pdf'}),'images-to-pdf.pdf');setStatus('imagesPdfStatus','Done — your PDF was downloaded.');}catch(e){setStatus('imagesPdfStatus',e.message,true);}
});

// Image processing via browser canvas.
const loadImage=async file=>{if(!file)throw new Error('Choose an image first.');const url=URL.createObjectURL(file);try{const img=new Image();img.src=url;await img.decode();return img;}finally{/* URL is released by caller after canvas draw */}};
$('imageQuality').addEventListener('input',e=>$('qualityValue').textContent=e.target.value+'%');
$('compressImageBtn').addEventListener('click',async()=>{
  try{const f=$('compressImage').files[0];const img=await loadImage(f);const c=document.createElement('canvas');c.width=img.naturalWidth;c.height=img.naturalHeight;c.getContext('2d').drawImage(img,0,0);const blob=await new Promise(r=>c.toBlob(r,'image/jpeg',+$('imageQuality').value/100));if(!blob)throw new Error('Could not compress this image.');downloadBlob(blob,safeName(f.name,'.jpg'));setStatus('imageStatus',`Done. Original: ${(f.size/1024).toFixed(0)} KB; result: ${(blob.size/1024).toFixed(0)} KB.`);}catch(e){setStatus('imageStatus',e.message,true);}
});
$('resizeImageBtn').addEventListener('click',async()=>{
  try{const f=$('resizeImage').files[0];const w=+$('resizeWidth').value,h=+$('resizeHeight').value;if(!w||!h||w>12000||h>12000)throw new Error('Enter valid width and height (1–12000 px).');const img=await loadImage(f);const c=document.createElement('canvas');c.width=w;c.height=h;c.getContext('2d').drawImage(img,0,0,w,h);const blob=await new Promise(r=>c.toBlob(r,'image/png'));if(!blob)throw new Error('Could not resize this image.');downloadBlob(blob,safeName(f.name,'-resized.png'));setStatus('resizeStatus','Done — resized image downloaded.');}catch(e){setStatus('resizeStatus',e.message,true);}
});

// FFmpeg WebAssembly loads only when a user starts a media conversion.
let ffmpegInstance=null;
async function getFFmpeg(statusId){
  if(ffmpegInstance)return ffmpegInstance;
  setStatus(statusId,'Loading media engine (first use may take a minute)…');
  const {FFmpeg}=await import('https://cdn.jsdelivr.net/npm/@ffmpeg/ffmpeg@0.12.10/dist/esm/index.js');
  const {toBlobURL}=await import('https://cdn.jsdelivr.net/npm/@ffmpeg/util@0.12.1/dist/esm/index.js');
  const ff=new FFmpeg();
  ff.on('progress',({progress})=>setStatus(statusId,`Processing… ${Math.max(0,Math.min(100,Math.round(progress*100)))}%`));
  const base='https://cdn.jsdelivr.net/npm/@ffmpeg/core@0.12.6/dist/umd';
  await ff.load({coreURL:await toBlobURL(base+'/ffmpeg-core.js','text/javascript'),wasmURL:await toBlobURL(base+'/ffmpeg-core.wasm','application/wasm')});
  ffmpegInstance=ff;return ff;
}
async function trimMedia(type){
  const isVideo=type==='video', statusId=isVideo?'videoStatus':'audioStatus', file=$ (isVideo?'videoFile':'audioFile');
  try{
    const f=file.files[0];if(!f)throw new Error('Choose a media file.');
    const start=+( $(isVideo?'videoStart':'audioStart').value ),end=+( $(isVideo?'videoEnd':'audioEnd').value );
    if(!Number.isFinite(start)||!Number.isFinite(end)||start<0||end<=start)throw new Error('Enter valid start and end times. End must be greater than start.');
    const ff=await getFFmpeg(statusId);setStatus(statusId,'Preparing file…');
    const ext=(f.name.split('.').pop()|| (isVideo?'mp4':'mp3')).toLowerCase().replace(/[^a-z0-9]/g,'');
    const input='input.'+ext, output=isVideo?'trimmed.mp4':'trimmed.mp3';
    await ff.writeFile(input,new Uint8Array(await f.arrayBuffer()));
    const args=['-ss',String(start),'-i',input,'-t',String(end-start)];
    if(isVideo)args.push('-c:v','libx264','-preset','ultrafast','-c:a','aac','-movflags','+faststart',output);
    else args.push('-vn','-codec:a','libmp3lame','-q:a','3',output);
    await ff.exec(args);const data=await ff.readFile(output);
    downloadBlob(new Blob([data],{type:isVideo?'video/mp4':'audio/mpeg'}),output);
    await ff.deleteFile(input);await ff.deleteFile(output);
    setStatus(statusId,'Done — trimmed file downloaded.');
  }catch(e){setStatus(statusId,(e.message||String(e))+' If this is a large file, try a shorter or smaller file.',true);}
}
$('trimVideoBtn').addEventListener('click',()=>trimMedia('video'));
$('trimAudioBtn').addEventListener('click',()=>trimMedia('audio'));
$('combineAudioBtn').addEventListener('click',async()=>{
  const statusId='combineAudioStatus';
  const files=[...$('combineAudioFiles').files];
  if(files.length<2){
    setStatus(statusId,'Choose at least two audio files to combine.',true);
    return;
  }

  try{
    if(!window.AudioContext||!window.OfflineAudioContext)throw new Error('Audio combining is not supported by this browser.');

    const decoder=new AudioContext();
    let audioBuffers;
    try{
      audioBuffers=[];
      for(let i=0;i<files.length;i++){
        setStatus(statusId,`Reading audio ${i+1} of ${files.length}…`);
        audioBuffers.push(await decoder.decodeAudioData(await files[i].arrayBuffer()));
      }
    }finally{
      await decoder.close();
    }

    const sampleRate=Math.max(...audioBuffers.map(buffer=>buffer.sampleRate));
    const channels=Math.max(...audioBuffers.map(buffer=>buffer.numberOfChannels));
    const duration=audioBuffers.reduce((total,buffer)=>total+buffer.duration,0);
    const frames=Math.ceil(duration*sampleRate);
    const dataBytes=frames*channels*2;
    if(!Number.isSafeInteger(dataBytes)||dataBytes>0xffffffff-36)throw new Error('The combined audio is too large to save as a WAV file.');

    setStatus(statusId,'Combining audio…');
    const output=new OfflineAudioContext(channels,frames,sampleRate);
    let offset=0;
    for(const buffer of audioBuffers){
      const source=output.createBufferSource();
      source.buffer=buffer;
      source.connect(output.destination);
      source.start(offset);
      offset+=buffer.duration;
    }

    const rendered=await output.startRendering();
    const wav=new ArrayBuffer(44+dataBytes);
    const view=new DataView(wav);
    const writeString=(position,value)=>{
      for(let i=0;i<value.length;i++)view.setUint8(position+i,value.charCodeAt(i));
    };
    writeString(0,'RIFF');
    view.setUint32(4,36+dataBytes,true);
    writeString(8,'WAVE');
    writeString(12,'fmt ');
    view.setUint32(16,16,true);
    view.setUint16(20,1,true);
    view.setUint16(22,channels,true);
    view.setUint32(24,sampleRate,true);
    view.setUint32(28,sampleRate*channels*2,true);
    view.setUint16(32,channels*2,true);
    view.setUint16(34,16,true);
    writeString(36,'data');
    view.setUint32(40,dataBytes,true);
    const channelData=Array.from({length:channels},(_,channel)=>rendered.getChannelData(channel));
    for(let frame=0;frame<frames;frame++){
      for(let channel=0;channel<channels;channel++){
        const sample=Math.max(-1,Math.min(1,channelData[channel][frame]||0));
        view.setInt16(44+(frame*channels+channel)*2,sample<0?sample*32768:sample*32767,true);
      }
    }

    downloadBlob(new Blob([wav],{type:'audio/wav'}),'combined-audio.wav');
    setStatus(statusId,'Done — combined audio downloaded as a WAV file.');
  }catch(error){
    setStatus(statusId,(error.message||String(error))+' Check that the selected files contain playable audio.',true);
  }
});
