document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("celebrateButton");
    const message = document.getElementById("greetingMessage");
    const giftBox = document.getElementById("giftBox");

    let clickCount = 0; // Đếm số lần nhấn nút

    button.addEventListener("click", () => {
        clickCount++;

        if (clickCount === 1) {
            message.textContent = "Chào bạn!";
            message.classList.remove("hidden");
            message.classList.add("visible");
        } else if (clickCount === 2) {
            message.textContent = "Tôi có món quà dành cho bạn";
            message.classList.remove("hidden");
            message.classList.add("visible");

            // Ẩn nút sau khi nhấn lần thứ 2
            button.style.display = "none";

            giftBox.classList.remove("hidden");
        }
    });

    giftBox.addEventListener("click", () => {
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
                message.textContent = "Chúc bạn giáng sinh vui vẻ!";
                giftBox.classList.add("hidden");
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

    // Load ribbon (bell) image
    const ribbonImage = new Image();
    ribbonImage.src = "bell.png"; // Replace with the actual path to your bell PNG

    let angle = 0; // Initial angle for rotation
    const maxAngle = 10; // Max angle for the shake effect

    function drawSnow() {
        ctx.clearRect(0, 0, width, height);

        // Draw the resized ribbon (bell) at the top of the screen with shake effect
        if (ribbonImage.complete) {
            const ribbonWidth = ribbonImage.width * 0.2; // Shrink the width to 30%
            const ribbonHeight = ribbonImage.height * 0.2; // Shrink the height to 30%
            const ribbonX = (width - ribbonWidth) / 2; // Center the ribbon horizontally
            const ribbonY = 0; // Position it at the top

            // Apply shake effect by rotating the image
            ctx.save();
            ctx.translate(ribbonX + ribbonWidth / 2, ribbonY + ribbonHeight / 2); // Move the origin to the center of the image
            ctx.rotate(Math.sin(angle) * maxAngle * Math.PI / 180); // Shake effect using sine function
            ctx.drawImage(ribbonImage, -ribbonWidth / 2, -ribbonHeight / 2, ribbonWidth, ribbonHeight); // Draw the image with rotation
            ctx.restore();

            // Increment angle for next frame to create continuous shaking
            angle += 0.1; // Adjust this value to control the speed of shaking
        }

        // Draw snowflakes
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

                // Update snowflake position
                flake.y += flake.speed;
                flake.x += Math.sin(flake.angle / 20) * 2;
                flake.angle += flake.rotationSpeed;

                // Reset snowflake if it moves out of bounds
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

    // Draw sleigh and reindeer
    const sleighImage = new Image();
    sleighImage.src = "sleigh.png"; // Replace with the actual path to your sleigh image

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
