'use script';
//thisがよくわからない。
//console.log()オブジェクトの状態を確認しながら作ろう
{
  const character=document.getElementById('character');
  const spin_cha=document.getElementById('spin_cha');
  const dress=document.getElementById('dress');
  const spin_dre=document.getElementById('spin_dre');
  const bonusImage=document.querySelector('#bonus img');
  let panelsLeft=3;
  let panelsLeftDress=3;
  let model;
  //クラス(設計図)を生成
  class Panel {
    //オブジェクトを新規作成するための初期化関数を作成(constructor)
    constructor() {
      //section要素img要素div要素を生成
      //統一して使うものとコピーしたもので使うものとの違いを意識しよう。
      //例えばsectionは全ての要素で共通だけどimg要素の画像パスはそれぞれ違うなとか。
      //俺の予想だけどthisというものにはオブジェクトがそれぞれ入るから、つまりpanels[0]、panels[1],panels[2]が入るんじゃないんかな
      const section=document.createElement('section');
      const sectionDress=document.createElement('section');
      section.classList.add('panel');
      sectionDress.classList.add('panel');
      this.img=document.createElement('img');
      this.img.src=this.getRandomImage();//ここでもthis使うのか。
      this.img.classList.add('img');
      this.imgDress=document.createElement('img');
      this.imgDress.src=this.getRandomImageDress();//ここでもthis使うのか。
      this.imgDress.classList.add('img');
      this.stopCha=document.createElement('div');
      this.stopCha.textContent='STOP';
      this.stopCha.classList.add('stop','inactive');
      this.stopCha.addEventListener('click',()=>{
        if(this.stopCha.classList.contains('inactive')) {
          return;
        }
        this.stopCha.classList.add('inactive');
        clearTimeout(this.timeoutId);
        panelsLeft--;
        if(panelsLeft===0) {
          checkResult();
          panelsLeft=3;
          spin_cha.classList.remove('inactive');
        }
      });
      this.stopDress=document.createElement('div');
      this.stopDress.textContent='STOP';
      this.stopDress.classList.add('stop','inactive');
      this.stopDress.addEventListener('click',()=>{
        if(this.stopDress.classList.contains('inactive')) {
          return;
        }
        this.stopDress.classList.add('inactive');
        clearTimeout(this.timeoutIdDress);
        panelsLeftDress--;
        if(panelsLeftDress===0) {
          checkResultDress();
          panelsLeftDress=3;
          spin_dre.classList.remove('inactive');
        }
      });
      //section要素にimg要素とdiv要素を入れmain要素にsection要素を入れる
      section.appendChild(this.img);
      section.appendChild(this.stopCha);
      sectionDress.appendChild(this.imgDress);
      sectionDress.appendChild(this.stopDress);
      character.appendChild(section);
      dress.appendChild(sectionDress);
    }
    //メソッドを定義
    //ランダムに画像を選んでそれを返り値として返す関数。
    getRandomImage() {
      const images=[
        'img/1.png',
        'img/2.png',
        'img/3.png',
        'img/4.png',
        'img/5.png',
        'img/6.png',
      ];
      return images[Math.floor(Math.random()*images.length)];
    }
    getRandomImageDress() {
      const imagesDress=[
        'img/yukata.png',
        'img/mizugi.png',
        'img/taisouhuku.png',
      ];
      return imagesDress[Math.floor(Math.random()*imagesDress.length)];
    }
    //getRandomImage()の返り値を設計図の画像パスに入れる処理を５０msで繰り返す関数。
    spin_cha() {
      this.img.src=this.getRandomImage();
      this.timeoutId=setTimeout(()=>{
        this.spin_cha();
      },50);
    }
    spin_dre() {
      this.imgDress.src=this.getRandomImageDress();
      this.timeoutIdDress=setTimeout(()=>{
        this.spin_dre();
      },50);
    }
    //画像にunmatchedクラスをつける関数。
    unmatched() {
      //thisにはpanels,[0]panels[1],panels[2]がそれぞれ入ると勝手ながら思った。
      this.img.classList.add('unmatched');
    }
    unmatchedDress() {
      //thisにはpanels,[0]panels[1],panels[2]がそれぞれ入ると勝手ながら思った。
      this.imgDress.classList.add('unmatched');
    }
  }
  
  //panelsという配列にオブジェクトを入れている。
  const panels=[
    // new Panel()でコンストラクターを呼び出してオブジェクト（クラスのインスタンス）を生成している。
    new Panel(),
    //{img: '<img src="img/1.png" class="img">', stopCha: '<div class="stopCha">STOP</div>'}
    new Panel(),
    //{img: '<img src="img/1.png" class="img">', stopCha: '<div class="stopCha">STOP</div>'}
    new Panel(),
    //{img: '<img src="img/1.png" class="img">', stopCha: '<div class="stopCha">STOP</div>'}
  ];
  
  //関数を定義
  //一つ一つのオブジェクトのsrcの値が他のオブジェクトのsrcの値と違うならそのオブジェクトに対してunmatched()を呼び出す関数。
  //panelsはクラス内で定義されていないのでここで関数を定義している。ここだからpanelsを使うことができる。
  function checkResult() {
    if(panels[0].img.src!==panels[1].img.src&&panels[0].img.src!==panels[2].img.src) {
      panels[0].unmatched();
    }
    if(panels[0].img.src===panels[1].img.src||panels[0].img.src===panels[2].img.src) {
      const url=panels[0].img.src;
      const atrUrl=panels[0].img.getAttribute("src");
      const bonusUrl=url.slice(0,-4)+'bonus.png';
      bonusImage.src=bonusUrl;
      model=atrUrl.substr(4,1);
      // model=bonusUrl.substr(58,1);
      console.log(model);
      console.log(atrUrl);
      console.log(model);
    }
    if(panels[1].img.src!==panels[0].img.src&&panels[1].img.src!==panels[2].img.src) {
      panels[1].unmatched();
    }
    if(panels[1].img.src===panels[0].img.src||panels[1].img.src===panels[2].img.src) {
      const url=panels[1].img.src;
      const atrUrl=panels[1].img.getAttribute("src");
      const bonusUrl=url.slice(0,-4)+'bonus.png';
      bonusImage.src=bonusUrl;
      model=atrUrl.substr(4,1);
      // model=bonusUrl.substr(58,1);
      console.log(model);
      console.log(atrUrl);
      console.log(model);
    }
    if(panels[2].img.src!==panels[0].img.src&&panels[2].img.src!==panels[1].img.src) {
      panels[2].unmatched();
    }
    if(panels[2].img.src===panels[0].img.src||panels[2].img.src===panels[1].img.src) {
      const url=panels[2].img.src;
      const atrUrl=panels[2].img.getAttribute("src");
      const bonusUrl=url.slice(0,-4)+'bonus.png';
      bonusImage.src=bonusUrl;
      model=atrUrl.substr(4,1);
      // model=bonusUrl.substr(58,1);
      console.log(model);
      console.log(atrUrl);
      console.log(model);
    }
  }
  
  function checkResultDress() {
    if(panels[0].imgDress.src!==panels[1].imgDress.src&&panels[0].imgDress.src!==panels[2].imgDress.src) {
      panels[0].unmatchedDress();
    }
    if(panels[0].imgDress.src===panels[1].imgDress.src||panels[0].imgDress.src===panels[2].imgDress.src) {
      const dressUrl=panels[0].imgDress.src;
      const modelUrl=dressUrl.replace('img/','img/'+model);
      console.log(modelUrl);
      bonusImage.src=modelUrl;
    }
    if(panels[1].imgDress.src!==panels[0].imgDress.src&&panels[1].imgDress.src!==panels[2].imgDress.src) {
      panels[1].unmatchedDress();
    }
    if(panels[1].imgDress.src===panels[0].imgDress.src||panels[1].imgDress.src===panels[2].imgDress.src) {
      const dressUrl=panels[1].imgDress.src;
      const modelUrl=dressUrl.replace('img/','img/'+model);
      console.log(modelUrl);
      bonusImage.src=modelUrl;
    }
    if(panels[2].imgDress.src!==panels[0].imgDress.src&&panels[2].imgDress.src!==panels[1].imgDress.src) {
      panels[2].unmatchedDress();
    }
    if(panels[2].imgDress.src===panels[0].imgDress.src||panels[2].imgDress.src===panels[1].imgDress.src) {
      const dressUrl=panels[2].imgDress.src;
      const modelUrl=dressUrl.replace('img/','img/'+model);
      console.log(modelUrl);
      bonusImage.src=modelUrl;
    }
  }
  
  //イベントを定義
  spin_cha.addEventListener('click',()=>{
    if(spin_cha.classList.contains('inactive')) {
      return;
    }
    //全てのオブジェクトに対して処理を実行する。
    panels.forEach(panel=>{
      panel.spin_cha();
      panel.img.classList.remove('unmatched');
      panel.stopCha.classList.remove('inactive');
    });
    spin_cha.classList.add('inactive');
    bonusImage.src='img/hatena.png';
  });
  
  spin_dre.addEventListener('click',()=>{
    if(spin_dre.classList.contains('inactive')) {
      return;
    }
    //全てのオブジェクトに対して処理を実行する。
    panels.forEach(panel=>{
      panel.spin_dre();
      panel.imgDress.classList.remove('unmatched');
      panel.stopDress.classList.remove('inactive');
    });
    spin_dre.classList.add('inactive');
  });
}

