document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("celebrateButton");
    const message = document.getElementById("greetingMessage");
    const giftBox = document.getElementById("giftBox");

    // Thêm các đối tượng âm thanh
    const clickSound = new Audio("click.mp3");
    const boxSound = new Audio("box.mp3");
    const backgroundMusic = new Audio("hpbdBackground.mp3");

    // Đặt chế độ lặp lại cho nhạc nền
    backgroundMusic.loop = true;

    let clickCount = 0; // Đếm số lần nhấn nút

    button.addEventListener("click", () => {
        clickCount++;
        clickSound.play(); // Phát âm thanh khi bấm nút

        if (clickCount === 1) {
            message.textContent = "Người yêu ơiiiiiiiiiiiiiiiiiiiiiiii";
            message.classList.remove("hidden");
            message.classList.add("visible");
        }
        if (clickCount === 2) {
            message.textContent = "Bé Cua xinh đẹp dễ thương cute phô mai que số một vũ trụ của anh ơiiiiiiiiiiiiiiiiiiiii";
            message.classList.remove("hidden");
            message.classList.add("visible");
        }
        if (clickCount === 3) {
            message.textContent = "Chuyện là .........";
            message.classList.remove("hidden");
            message.classList.add("visible");
        }
        if (clickCount === 4) {
            message.textContent = "Anh có món quà này muốn gửi cho emmmmmmmmmm";
            message.classList.remove("hidden");
            message.classList.add("visible");
        }
         else if (clickCount === 5) {
            message.textContent = "Em mở nó ra nhaaaaaa ...";
            message.classList.remove("hidden");
            message.classList.add("visible");

            // Ẩn nút sau khi nhấn lần thứ 2
            button.style.display = "none";

            giftBox.classList.remove("hidden");
        }
    });

    giftBox.addEventListener("click", () => {
        boxSound.play(); // Phát âm thanh khi bấm vào giftBox

        // Tạm dừng animation bounce
        giftBox.style.animation = "none";

        // Áp dụng hiệu ứng phình to
        giftBox.style.transform = "scale(1.1)";
        giftBox.style.opacity = "0.8";

        setTimeout(() => {
            // Áp dụng hiệu ứng nổ
            giftBox.style.transform = "scale(3)";
            giftBox.style.opacity = "0";

            setTimeout(() => {
                const greetingVideo = document.getElementById("greetingVideo");
                greetingVideo.classList.remove("hidden");
                greetingVideo.classList.add("visible");
                greetingVideo.style.marginTop = "20px";
                greetingVideo.play(); 

                giftBox.classList.add("hidden");
    
                // Lắng nghe sự kiện video kết thúc
                greetingVideo.addEventListener('ended', () => {

                    // Phát nhạc nền sau khi hết video
                    backgroundMusic.play();

                    //Ẩn video sau khi phát xong 
                    greetingVideo.classList.add("hidden");
                    message.innerHTML = 'Chúc em sinh nhật vui vẻ ';

                    gifContainer.classList.remove("hidden");
                    gifContainer.classList.add("visible");
                    gifContainer.style.marginTop = "20px";
                });
                

                // message.innerHTML = '';
                // //message.innerHTML = "Chúc em sinh nhật vui vẻ ^^ <br> Giáng sinh năm nay, hay nhiều năm nữa thì anh vẫn muốn chúng ta có nhau :3 <br> Anh yêu em nhiều lắm ❤❤";
                // giftBox.classList.add("hidden");
                // gifContainer.classList.remove("hidden");
                // gifContainer.classList.add("visible");
                // gifContainer.style.marginTop = "20px";

            }, 1000); // Thời gian nổ
        }, 1000); // Thời gian phình to
    });

    // Thêm thẻ <div> chứa các GIF động nếu chưa có
    let gifContainer = document.getElementById("gifContainer");
    if (!gifContainer) {
    gifContainer = document.createElement("div");
    gifContainer.id = "gifContainer";
    gifContainer.style.textAlign = "center";
    gifContainer.innerHTML = `
        <img src="https://media.giphy.com/media/rkoli75BEjGXr7ck4o/giphy.gif?cid=790b761195238v072ko5ztxliea52tk5vpt2l5rglueutghc&ep=v1_gifs_search&rid=giphy.gif&ct=g" alt="GIF 1" style="width: 150px; margin: 5px;">
        <img src="https://media.giphy.com/media/GvjRy6pUMUjQxiKNlh/giphy.gif?cid=790b761195238v072ko5ztxliea52tk5vpt2l5rglueutghc&ep=v1_gifs_search&rid=giphy.gif&ct=g" alt="GIF 2" style="width: 150px; margin: 5px;">
        <img src="https://media.giphy.com/media/ytBuODur5PaUlOHyQ7/giphy.gif?cid=790b761195238v072ko5ztxliea52tk5vpt2l5rglueutghc&ep=v1_gifs_search&rid=giphy.gif&ct=g" alt="GIF 3" style="width: 150px; margin: 5px;">
    `;
    document.body.appendChild(gifContainer);
}


    // Snow effect background
    const canvas = document.createElement("canvas");
    canvas.id = "snowCanvas";
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const cakeImage = new Image();
    cakeImage.src = "cake2.png"; // Replace with the actual path to your snowflake image

    const cakes = Array.from({ length: 100 }).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 50 + 10,
        speed: Math.random() * 3 + 1,
        opacity: Math.random() * 0.8 + 0.2,
        angle: Math.random() * 360,
        rotationSpeed: Math.random() * 2 - 1,
    }));

    const sleighs = Array.from({ length: 5 }).map(() => ({
        x: -200,
        y: Math.random() * height / 2 + height / 4,
        speed: Math.random() * 2 + 2,
    }));

    const ribbonImage = new Image();
    ribbonImage.src = "cake.png";

    let angle = 0;
    const maxAngle = 10;

    function drawSnow() {
        ctx.clearRect(0, 0, width, height);

        if (ribbonImage.complete) {
            const ribbonWidth = ribbonImage.width * 0.05;
            const ribbonHeight = ribbonImage.height * 0.05;
            const ribbonX = (width - ribbonWidth) / 2;
            const ribbonY = 0;

            ctx.save();
            ctx.translate(ribbonX + ribbonWidth / 2, ribbonY + ribbonHeight / 2);
            ctx.rotate(Math.sin(angle) * maxAngle * Math.PI / 180);
            ctx.drawImage(ribbonImage, -ribbonWidth / 2, -ribbonHeight / 2, ribbonWidth, ribbonHeight);
            ctx.restore();
            angle += 0.1;
        }

        cakes.forEach((cake) => {
            if (cakeImage.complete) {
                ctx.save();
                ctx.globalAlpha = cake.opacity;
                ctx.translate(cake.x, cake.y);
                ctx.rotate((cake.angle * Math.PI) / 180);
                ctx.drawImage(
                    cakeImage,
                    -cake.size / 2,
                    -cake.size / 2,
                    cake.size,
                    cake.size
                );
                ctx.restore();

                cake.y += cake.speed;
                cake.x += Math.sin(cake.angle / 20) * 2;
                cake.angle += cake.rotationSpeed;

                if (cake.y > height) {
                    cake.y = -cake.size;
                    cake.x = Math.random() * width;
                }
                if (cake.x > width || cake.x < 0) {
                    cake.x = Math.random() * width;
                }
            }
        });
        //drawSleighs();
        requestAnimationFrame(drawSnow);
    }

    const sleighImage = new Image();
    sleighImage.src = "sleigh.png";

    function drawSleighs() {
        if (sleighImage.complete) {
            sleighs.forEach((sleigh) => {
                ctx.drawImage(sleighImage, sleigh.x, sleigh.y, 400, 300);
                sleigh.x += sleigh.speed;
                if (sleigh.x > width) {
                    sleigh.x = -200;
                    sleigh.y = Math.random() * height / 2 + height / 4;
                }
            });
        }
    }

    drawSnow();

    window.addEventListener("resize", () => {
        width = window.innerWidth;
        height = window.innerHeight;
        canvas.width = width;
        canvas.height = height;
    });
});
