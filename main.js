FS = require('fs');
function load (file) {
  return JSON.parse(FS.readFileSync(file, 'utf8'));
}
function save (file, data) {
  FS.writeFileSync(file, JSON.stringify(data, null, 2));
}

qna = []
progress = 0;
for(var i = 0; i < 38; i++) {
  korquad = load('./korquad/korquad2.1_train_'+`${i}`.padStart(2, '0')+'.json');
  length = korquad['data'].length;

  datalist = korquad['data'].forEach(function(data){
      data['qas'].forEach(function(elem){
          ans = elem['answer']['text'];
          if(!ans.includes('tbody')){
              ans = ans.replace(/<[^>]*(>|$)|\[[^\]]*(\]|$)|&nbsp;|&#34;|&#39;|&zwnj;|&raquo;|&laquo;|&gt;/g, '');
              progress++;
              console.log(`${progress}`)
              qna.push({
                  q: elem['question'],
                  a: ans
              });
      }
      });
  })
}

save('./qna.json', qna);
