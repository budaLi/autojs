//toasts函数的返回值是一个函数，之后的悬浮窗操作都在这个函数中进行，通知内容最好不要太长
var tongzhi = toasts("通知1", 2000);
sleep(2500);
tongzhi("本通知有3行，可是只能显示2行\n第2行\n第3行");
sleep(4000);
tongzhi("通知3");



function toasts(mes, time) { //mes 是输入的通知内容，time是通知持续时间，单位是 毫秒（默认值是5秒，所以这个参数可以省略）
    var x = device.width / 2, //悬浮窗的宽度
        y = device.height / 16, //悬浮窗的高度
        th = ""; //备用变量

    var flo = floaty.window( //新建一个悬浮窗
        <frame gravity="center">
            <text id="message" bg="#66000000" textColor="#ffffff" textSize="35px" gravity="center" w="*" padding="1"/>
        </frame>
    );

    doflo(mes, time); //调用函数，设置悬浮窗的文字内容
    return doflo; //返回一个函数，之后的操作都在这个函数中进行。


    function doflo(mes, time) {

        time = time || 5000;
        mes = mes || "";

        //通过截屏图片来区分当前屏幕方向
        requestScreenCapture(); //请求截屏
        var pic = captureScreen(); //截屏
        var X = pic.getWidth(), //当前屏幕宽度
            Y = pic.getHeight(); //当前屏幕高度

        X = (X - x) / 2; //悬浮窗的位置坐标
        Y = Y * 0.75; //悬浮窗的位置坐标

        if (th != "") {
            th.interrupt(); //停止这个线程
            th = "";
        }

        ui.run(function() { //在ui线程中对悬浮窗进行操作
            flo.message.setText(mes); //设置文本
        });

        flo.setPosition(X, Y); //设置悬浮窗的位置
        flo.setSize(x, y); //设置悬浮窗大小

        th = threads.start(function() { //新建一个线程
            sleep(time); //等待time毫秒
            flo.setSize(0, 0); //设置悬浮窗大小为0,0
            th = "";
        });
    }
}