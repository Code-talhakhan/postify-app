const user = JSON.parse(localStorage.getItem("loggedInUser"));
if (!user) location.href = "../login-page/index.html";

// Signup Name Logic
const signupName = user.name || user.email.split("@")[0];
userDp.textContent = signupName[0].toUpperCase();
userNameDisplay.textContent = signupName;

logoutBtn.onclick = () => {
    localStorage.removeItem("loggedInUser");
    location.href = "../login-page/index.html";
};

themeToggle.onclick = () => document.body.classList.toggle("light");

let posts = JSON.parse(localStorage.getItem("posts")) || [];
let editId = null;

postBtn.onclick = () => {
    if (!title.value || !content.value) return;
    posts.unshift({
        id: Date.now(),
        email: user.email,
        title: title.value,
        content: content.value,
        time: moment().toISOString(),
        likes: [],
        comments: []
    });
    save();
    render();
    title.value = "";
    content.value = "";
};

function save() {
    localStorage.setItem("posts", JSON.stringify(posts));
}

function render() {
    feed.innerHTML = "";
    posts.forEach(p => {
        const liked = p.likes.includes(user.email);
        const div = document.createElement("div");
        div.className = "post";

        div.innerHTML = `
<div class="post-head">
    <div class="userbox">
        <div class="dp">${p.email[0].toUpperCase()}</div>
        <div>
            <div>${p.email}</div>
            <div class="time">${moment(p.time).fromNow()}</div> 
        </div>
    </div>
    <div class="menu"><i class="fa fa-ellipsis"></i></div>
    <div class="dropdown">
        ${p.email === user.email ? `
        <div class="edit"><i class="fa fa-pen"></i>Edit</div>
        <div class="delete"><i class="fa fa-trash"></i>Delete</div>` : ""}
    </div>
</div>
<div class="title">${p.title}</div>
<div class="text">${p.content}</div>
<div class="actions">
    <div class="like"><i class="fa-heart fa ${liked ? "liked" : ""}"></i> ${p.likes.length}</div>
    <div class="commentBtn"><i class="fa-regular fa-comment"></i> ${p.comments.length}</div>
</div>
<div class="comment-box">
    <input placeholder="Write comment...">
    <button class="send">➤</button>
</div>
<div class="comments">
    ${p.comments.map(c => `<div class="comment"><b>${c.name || c.email.split("@")[0]}:</b> ${c.text}</div>`).join("")}
</div>
`;

        const menu = div.querySelector(".menu");
        const drop = div.querySelector(".dropdown");
        menu.onclick = () => drop.style.display = drop.style.display === "block" ? "none" : "block";

        const del = div.querySelector(".delete");
        if (del) {
            del.onclick = () => {
                document.getElementById("modal").style.display = "flex";
                document.getElementById("confirm").onclick = () => {
                    posts = posts.filter(x => x.id !== p.id);
                    save(); render();
                    document.getElementById("modal").style.display = "none";
                };
                document.getElementById("cancel").onclick = () => document.getElementById("modal").style.display = "none";
            };
        }

        const editBtn = div.querySelector(".edit");
        if (editBtn) {
            editBtn.onclick = () => {
                editId = p.id;
                document.getElementById("editTitle").value = p.title;
                document.getElementById("editContent").value = p.content;
                document.getElementById("editModal").style.display = "flex";
            };
        }

        div.querySelector(".like").onclick = () => {
            if (p.likes.includes(user.email)) p.likes = p.likes.filter(e => e !== user.email);
            else p.likes.push(user.email);
            save(); render();
        };

        div.querySelector(".commentBtn").onclick = () => {
            const box = div.querySelector(".comment-box");
            box.style.display = box.style.display === "flex" ? "none" : "flex";
        };

        const send = div.querySelector(".send");
        const input = div.querySelector("input");
        send.onclick = () => {
            if (!input.value) return;
            p.comments.push({ 
                email: user.email, 
                name: user.name || user.email.split("@")[0], 
                text: input.value 
            });
            save(); render();
        };

        feed.appendChild(div);
    });
}

document.getElementById("confirmEdit").onclick = () => {
    const p = posts.find(x => x.id === editId);
    if (p) {
        p.title = document.getElementById("editTitle").value;
        p.content = document.getElementById("editContent").value;
        save(); render();
        document.getElementById("editModal").style.display = "none";
    }
};

document.getElementById("cancelEdit").onclick = () => document.getElementById("editModal").style.display = "none";

render();
