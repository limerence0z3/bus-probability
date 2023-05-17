const { spawn } = require('child_process');
const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('請選擇要執行的功能（A 或 B）：', (option) => {
  if (option === 'A') {
    rl.question('請輸入縣市(例如:臺南市)：', (arg1) => {
      rl.question('請輸入地區(例如:三五甲)：', (arg2) => {
        const pythonScriptPath = './bus.py';
        const pythonProcess = spawn('python', [pythonScriptPath, arg1, arg2]);

        pythonProcess.stdout.on('data', (data) => {
          const result = data.toString().trim();
          console.log(`Python 計算結果為：${result}`);
          rl.close();
        });

        pythonProcess.stderr.on('data', (data) => {
          console.error(`Python 錯誤訊息：${data}`);
        });

        pythonProcess.on('close', (code) => {
          console.log(`Python 腳本執行完畢，退出代碼：${code}`);
        });
      });
    });
  } else if (option === 'B') {
    rl.question('請輸入縣市(例如:臺南市)：', (arg1) => {
      rl.question('請輸入公車代碼(例如:TTT0981)：', (arg2) => {
        rl.question('請輸入路徑(例如：市區環線):', (arg3) => {
          rl.question('請輸入數字(0:去程 1:返程 2:迴圈): ', (arg4) => {
            rl.question('請輸入要查詢的西元年份(例如:2023):', (arg5) => {
              rl.question('請輸入要查詢的月份(例如:5):', (arg6) => {
                rl.question('請輸入要查詢的日(例如:15):', (arg7) => {
                  const pythonScriptPath = './bus.py';
                  const pythonProcess = spawn('python', [pythonScriptPath, arg1, arg2, arg3, arg4, arg5, arg6, arg7]);

                  pythonProcess.stdout.on('data', (data) => {
                    const result = data.toString().trim();
                    console.log(`Python 計算結果為：${result}`);
                    rl.close();
                  });

                  pythonProcess.stderr.on('data', (data) => {
                    console.error(`Python 錯誤訊息：${data}`);
                  });

                  pythonProcess.on('close', (code) => {
                    console.log(`Python 腳本執行完畢，退出代碼：${code}`);
                  });
                });
              });
            });
          });
        });
      });
    });
  } else {
    console.error('選擇的功能不正確，請輸入 A 或 B');
    rl.close();
  }
});








