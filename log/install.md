1. 安装 vscode、node、git

2. git 插件：gitLens（查看谁编辑的代码）

3. 生成 ssh key 证书：
   - ls -al ~/.ssh 查看是否存在 ssh
   - ssh-keygen -t rsa -b 4096 -C "chensongtao@zuoyebang.com" 生成 ssh key 直接回车知道出现图形（已经生成了 .ssh文件夹）
   - mac: command + shift + . 查看隐藏文件 .ssh （chensongtao（用户） 文件夹下）
   - 添加 id_rsa.pub 文件到 github

4. 美化 terminal
   - 将 .zshrc（桌面/.zshrc） 文件，放在用户名目录下，我这台 mac 是 chensongta 目录下
   - 将 oh-my-zsh 解压
   - 打开终端，ls , viw .zshrc 修改 `export ZSH="/users/${USER}/Desktop/project/oh-my-zsh"`为 oh-my-zsh 解压之后的路径
   - source .zshrc

