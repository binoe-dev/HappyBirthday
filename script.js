document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("celebrateButton");
    const message = document.getElementById("greetingMessage");
    const giftBox = document.getElementById("giftBox");

    // Thêm các đối tượng âm thanh
    const clickSound = new Audio("click.mp3");
    const boxSound = new Audio("box.mp3");
    const backgroundMusic = new Audio("music.mp3");

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
                message.innerHTML = "Chúc em giáng sinh vui vẻ ^^ <br> Giáng sinh năm nay, hay nhiều năm nữa thì anh vẫn muốn chúng ta có nhau :3 <br> Anh yêu em nhiều lắm ❤❤";
                giftBox.classList.add("hidden");

                // Phát nhạc nền sau khi hộp quà được mở
                backgroundMusic.play();
            }, 1000); // Thời gian nổ
        }, 1000); // Thời gian phình to
    });

    // Snow effect background
    const canvas = document.createElement("canvas");
    canvas.id = "snowCanvas";
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    const snowflakeImage = new Image();
    snowflakeImage.src = "snowflake.png"; // Replace with the actual path to your snowflake image

    const snowflakes = Array.from({ length: 100 }).map(() => ({
        x: Math.random() * width,
        y: Math.random() * height,
        size: Math.random() * 30 + 10,
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
    ribbonImage.src = "bell.png";

    let angle = 0;
    const maxAngle = 10;

    function drawSnow() {
        ctx.clearRect(0, 0, width, height);

        if (ribbonImage.complete) {
            const ribbonWidth = ribbonImage.width * 0.2;
            const ribbonHeight = ribbonImage.height * 0.2;
            const ribbonX = (width - ribbonWidth) / 2;
            const ribbonY = 0;

            ctx.save();
            ctx.translate(ribbonX + ribbonWidth / 2, ribbonY + ribbonHeight / 2);
            ctx.rotate(Math.sin(angle) * maxAngle * Math.PI / 180);
            ctx.drawImage(ribbonImage, -ribbonWidth / 2, -ribbonHeight / 2, ribbonWidth, ribbonHeight);
            ctx.restore();
            angle += 0.1;
        }

        snowflakes.forEach((flake) => {
            if (snowflakeImage.complete) {
                ctx.save();
                ctx.globalAlpha = flake.opacity;
                ctx.translate(flake.x, flake.y);
                ctx.rotate((flake.angle * Math.PI) / 180);
                ctx.drawImage(
                    snowflakeImage,
                    -flake.size / 2,
                    -flake.size / 2,
                    flake.size,
                    flake.size
                );
                ctx.restore();

                flake.y += flake.speed;
                flake.x += Math.sin(flake.angle / 20) * 2;
                flake.angle += flake.rotationSpeed;

                if (flake.y > height) {
                    flake.y = -flake.size;
                    flake.x = Math.random() * width;
                }
                if (flake.x > width || flake.x < 0) {
                    flake.x = Math.random() * width;
                }
            }
        });
        drawSleighs();
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
