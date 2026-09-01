// ============================================================
// 🌶️ SPICY STATION FAST FOOD
// MAIN JAVASCRIPT
// ============================================================


// ============================================================
// 🔧 GLOBAL DATA + 💾 PERMANENT STORAGE
// ============================================================

let bills = [];

let currentBill = [];

let selectedPayment = "";


// ============================================================
// 🍔 DEFAULT ITEMS
// ============================================================

let items = [
    {
        id: 1,
        name: "Chicken Rice",
        price: 100,
        category: "Rice"
    },
    {
        id: 2,
        name: "Chilli Chicken Bone",
        price: 130,
        category: "Chicken"
    },
    {
        id: 3,
        name: "Chilli Chicken Boneless",
        price: 150,
        category: "Chicken"
    },
    {
        id: 4,
        name: "Gobi Rice",
        price: 80,
        category: "Rice"
    },
    {
        id: 5,
        name: "Chicken Biryani",
        price: 120,
        category: "Biryani"
    },
    {
        id: 6,
        name: "Gobi Manchurian",
        price: 79,
        category: "Veg"
    },
    {
        id: 7,
        name: "Egg Noodles",
        price: 80,
        category: "Noodles"
    },
    {
        id: 8,
        name: "Chicken Noodles",
        price: 99,
        category: "Noodles"
    }
];


let staffList = [];

let staffAttendance = {};
let investments = [];

// ============================================================
// 💾 LOAD SAVED DATA
// ============================================================

function loadSavedData() {

    const savedItems =
        localStorage.getItem("spicyStationItems");

    const savedBills =
        localStorage.getItem("spicyStationBills");

    const savedStaff =
        localStorage.getItem("spicyStationStaff");

    const savedAttendance =
        localStorage.getItem(
            "spicyStationAttendance"
        );

    const savedInvestments =
        localStorage.getItem(
            "spicyStationInvestments"
        );


    if (savedItems) {

        items =
            JSON.parse(savedItems);

    }


    if (savedBills) {

        bills =
            JSON.parse(savedBills);

    }


    if (savedStaff) {

        staffList =
            JSON.parse(savedStaff);

    }


    if (savedAttendance) {

        staffAttendance =
            JSON.parse(savedAttendance);

    }


    if (savedInvestments) {

        investments =
            JSON.parse(savedInvestments);

    }

}
// ============================================================
// 💾 SAVE ALL DATA
// ============================================================

function saveAllData() {

    localStorage.setItem(
        "spicyStationItems",
        JSON.stringify(items)
    );


    localStorage.setItem(
        "spicyStationBills",
        JSON.stringify(bills)
    );


    localStorage.setItem(
        "spicyStationStaff",
        JSON.stringify(staffList)
    );


    localStorage.setItem(
        "spicyStationAttendance",
        JSON.stringify(staffAttendance)
    );
localStorage.setItem(
    "spicyStationInvestments",
    JSON.stringify(investments)
);
}


// ============================================================
// 🚀 LOAD DATA WHEN APP STARTS
// ============================================================

loadSavedData();

// ============================================================
// 🚀 START APP
// ============================================================

function startApp() {

    showScreen("dashboard-screen");

}


// ============================================================
// 🖥️ SCREEN MANAGEMENT
// ============================================================

function showScreen(screenId) {

    const screens =
        document.querySelectorAll(".screen");

    screens.forEach(function(screen) {

        screen.style.display = "none";

    });


    const target =
        document.getElementById(screenId);

    if (target) {

        target.style.display = "block";

    }

}


// ============================================================
// 🏠 BACK HOME
// ============================================================

function backHome() {

    showScreen("dashboard-screen");

}


// ============================================================
// 🧾 NEW BILL
// ============================================================

function newBill() {

    currentBill = [];

    showScreen("billing-screen");

    renderCategories();

    renderMenu();

    updateBill();

}


// ============================================================
// ➕ ADD ITEM SCREEN
// ============================================================

function showAddItem() {

    showScreen("add-item-screen");

}


// ============================================================
// 📊 ITEM SALES
// ============================================================

function showItemSales() {

    showScreen("item-sales-screen");


    const screen =
        document.getElementById(
            "item-sales-screen"
        );


    if (!screen) return;


    const sales = {};


    bills.forEach(function(bill) {

        if (!Array.isArray(bill.items)) {
            return;
        }


        bill.items.forEach(function(item) {

            const name =
                item.name || "Unknown Item";


            const qty =
                Number(item.qty) || 0;


            const amount =
                (Number(item.price) || 0) *
                qty;


            if (!sales[name]) {

                sales[name] = {

                    qty: 0,

                    amount: 0

                };

            }


            sales[name].qty += qty;

            sales[name].amount += amount;

        });

    });


    const entries =
        Object.entries(sales);


    screen.innerHTML = `

        <header class="page-header">

            <button
                type="button"
                onclick="backHome()"
            >
                ←
            </button>

            <h2>
                📊 Item Sales
            </h2>

            <div></div>

        </header>


        <main class="item-sales-container">

            <div class="item-sales-title">

                <h3>
                    🍔 Item Wise Sales
                </h3>

                <span>
                    ${entries.length} Items
                </span>

            </div>


            ${
                entries.length === 0

                ?

                `
                <div class="no-item-sales">

                    📭 Abhi koi item sale nahi hai.

                </div>
                `

                :

                entries
                .sort(function(a, b) {

                    return (
                        b[1].qty -
                        a[1].qty
                    );

                })
                .map(function(entry) {

                    const name =
                        entry[0];

                    const data =
                        entry[1];


                    return `

                        <div class="item-sales-card">

                            <div>

                                <strong>
                                    🍔 ${name}
                                </strong>

                                <span>
                                    ${data.qty} Qty Sold
                                </span>

                            </div>


                            <strong>
                                ₹${data.amount.toFixed(2)}
                            </strong>

                        </div>

                    `;

                })
                .join("")

            }

        </main>

    `;

}
// ============================================================
// 💰 SALES
// ============================================================

function showSales() {

    showScreen("sales-screen");


    const screen =
        document.getElementById("sales-screen");


    if (!screen) return;


    let totalSales = 0;

    let cashSales = 0;

    let upiSales = 0;


    bills.forEach(function(bill) {

        const amount =
            Number(bill.total) || 0;


        totalSales += amount;


        if (bill.payment === "UPI") {

            upiSales += amount;

        } else {

            cashSales += amount;

        }

    });


    screen.innerHTML = `

        <header class="page-header">

            <button
                type="button"
                onclick="backHome()"
            >
                ←
            </button>

            <h2>
                💰 Sales
            </h2>

            <div></div>

        </header>


        <main class="sales-container">

            <div class="sales-summary-grid">

                <div class="sales-summary-card">

                    <span>
                        💰 Total Sales
                    </span>

                    <strong>
                        ₹${totalSales.toFixed(2)}
                    </strong>

                </div>


                <div class="sales-summary-card">

                    <span>
                        🧾 Total Bills
                    </span>

                    <strong>
                        ${bills.length}
                    </strong>

                </div>


                <div class="sales-summary-card">

                    <span>
                        💵 Cash Sales
                    </span>

                    <strong>
                        ₹${cashSales.toFixed(2)}
                    </strong>

                </div>


                <div class="sales-summary-card">

                    <span>
                        📱 UPI Sales
                    </span>

                    <strong>
                        ₹${upiSales.toFixed(2)}
                    </strong>

                </div>

            </div>


            <div class="sales-bills">

                <h3>
                    📜 Saved Bills
                </h3>


                ${
                    bills.length === 0

                    ?

                    `
                    <div class="no-sales">

                        📭 Abhi koi bill saved nahi hai.

                    </div>
                    `

                    :

                    bills
                    .slice()
                    .reverse()
                    .map(function(bill) {

                        return `

                        <div class="sale-bill-card">

                            <div>

                                <strong>
                                    🧾 Bill #${bill.id}
                                </strong>

                                <small>
                                    ${bill.date}
                                </small>

                            </div>


                            <strong>
                                ₹${Number(
                                    bill.total
                                ).toFixed(2)}
                            </strong>


                            <span>
                                ${
                                    bill.payment === "UPI"
                                    ? "📱 UPI"
                                    : "💵 Cash"
                                }
                            </span>

                        </div>

                        `;

                    })
                    .join("")

                }

            </div>

        </main>

    `;

}


// ============================================================
// 📜 HISTORY
// ============================================================

function showHistory() {

    showScreen("history-screen");


    const screen =
        document.getElementById("history-screen");


    if (!screen) return;


    screen.innerHTML = `

        <header class="page-header">

            <button
                type="button"
                onclick="backHome()"
            >
                ←
            </button>

            <h2>
                📜 History
            </h2>

            <div></div>

        </header>


        <main class="history-container">

            <div class="history-title">

                <h3>
                    🧾 All Bills
                </h3>

                <span>
                    ${bills.length} Bills
                </span>

            </div>


            ${
                bills.length === 0

                ?

                `
                <div class="no-history">

                    📭 Abhi koi bill history nahi hai.

                </div>
                `

                :

                bills
                .slice()
                .reverse()
                .map(function(bill) {

                    let itemsText = "🧾 Bill Items";


                    if (
                        Array.isArray(bill.items)
                    ) {

                        itemsText =
                            bill.items
                            .map(function(item) {

                                return (
                                    item.name +
                                    " × " +
                                    item.qty
                                );

                            })
                            .join(", ");

                    }


                    return `

                        <div
                            class="history-card"
                            onclick="viewHistoryBill(${bill.id})"
                        >

                            <div class="history-card-top">

                                <strong>
                                    🧾 Bill #${bill.id}
                                </strong>

                                <strong>
                                    ₹${Number(
                                        bill.total
                                    ).toFixed(2)}
                                </strong>

                            </div>


                            <div class="history-card-info">

                                <span>
                                    📅 ${bill.date}
                                </span>

                                <span>
                                    ${
                                        bill.payment === "UPI"
                                        ? "📱 UPI"
                                        : "💵 Cash"
                                    }
                                </span>

                            </div>


                            <p>
                                ${itemsText}
                            </p>

                        </div>

                    `;

                })
                .join("")

            }

        </main>

    `;

}


/* ============================================================
   🧾 HISTORY BILL DETAILS
   ============================================================ */

function viewHistoryBill(billId) {

    const bill =
        bills.find(function(bill) {
            return bill.id === billId;
        });


    if (!bill) {

        alert("⚠️ Bill nahi mila.");

        return;

    }


    if (!Array.isArray(bill.items)) {

        alert(
            "⚠️ Is purane bill ka item data invalid hai."
        );

        return;

    }


    let itemsHTML = "";


    bill.items.forEach(function(item) {

        const price =
            Number(item.price) || 0;

        const qty =
            Number(item.qty) || 0;

        const itemTotal =
            price * qty;


        itemsHTML += `

            <div class="history-bill-item">

                <span>
                    ${item.name} × ${qty}
                </span>

                <strong>
                    ₹${itemTotal.toFixed(2)}
                </strong>

            </div>

        `;

    });


    const payment =
        bill.payment || "Cash";

// ============================================================
// ✏️ EDIT HISTORY
// ============================================================

let editHistoryHTML = "";

if (
    Array.isArray(bill.editHistory) &&
    bill.editHistory.length > 0
) {

    editHistoryHTML = `

        <hr>

        <div class="bill-edit-history">

            <h3>
                ✏️ Edit History
            </h3>

            ${bill.editHistory.map(function(edit, index) {

                return `

                    <div class="edit-history-item">

                        <strong>
                            Edit #${index + 1}
                        </strong>

                        <p>
                            👤 Edited by:
                            ${edit.editedBy || "Unknown"}
                        </p>

                        <p>
                            📝 Reason:
                            ${edit.reason || "No reason"}
                        </p>

                        <p>
                            💰 Old Total:
                            ₹${Number(
                                edit.oldTotal || 0
                            ).toFixed(2)}
                        </p>

                        <p>
                            💰 New Total:
                            ₹${Number(
                                edit.newTotal || 0
                            ).toFixed(2)}
                        </p>

                        <p>
                            🕐 Date/Time:
                            ${edit.editedAt || "Unknown"}
                        </p>

                    </div>

                `;

            }).join("")}

        </div>

    `;
}
    const modalHTML = `

        <div
            id="history-bill-modal"
            class="history-bill-modal"
        >

            <div class="history-bill-box">

                <button
                    type="button"
                    class="history-bill-close"
                    onclick="closeHistoryBill()"
                >
                    ✕
                </button>


                <div id="print-bill-content">

                      </button>
<p>
    🧾 BILL #${bill.id}

    <button
        type="button"
        onclick="event.stopPropagation(); copyBillId(${bill.id})"
        title="Copy Bill ID"
        style="
            margin-left:8px;
            padding:4px 8px;
            cursor:pointer;
        "
    >
        ⧉
    </button>
</p>
                    
                        📅 ${bill.date}
                    </p>

                    <hr>


                    <div class="history-bill-items">

                        ${itemsHTML}

                    </div>


                    <hr>


                    <div class="history-bill-total">

                        <strong>
                            TOTAL
                        </strong>

                        <strong>
                            ₹${Number(
                                bill.total
                            ).toFixed(2)}
                        </strong>

                    </div>


                    <p>
                        Payment:
                        ${
                            payment === "UPI"
                            ? "📱 UPI"
                            : "💵 Cash"
                        }
                    </p>
${editHistoryHTML}
                </div>


                <button
                    type="button"
                    class="print-history-button"
                    onclick="printHistoryBill(${bill.id})"
                >
                    🖨️ Print Bill
                </button>

            </div>

        </div>

    `;


    document.body.insertAdjacentHTML(
        "beforeend",
        modalHTML
    );

}


/* ============================================================
   ❌ CLOSE BILL DETAILS
   ============================================================ */

function closeHistoryBill() {

    const modal =
        document.getElementById(
            "history-bill-modal"
        );


    if (modal) {

        modal.remove();

    }

}


/* ============================================================
   🖨️ PRINT HISTORY BILL
   ============================================================ */

function printHistoryBill(billId) {

    const bill =
        bills.find(function(bill) {
            return bill.id === billId;
        });


    if (!bill) {
    
        alert("⚠️ Bill nahi mila.");

        return;

    }
const paperSize =
        localStorage.getItem(
            "spicyStationPrinterPaper"
        ) || "58";

    if (!Array.isArray(bill.items)) {

        alert(
            "⚠️ Is bill ka item data invalid hai."
        );

        return;

    }


    const printWindow =
        window.open(
            "",
            "_blank",
            "width=400,height=600"
        );


    if (!printWindow) {

        alert(
            "⚠️ Print window blocked hai. Browser popup allow karo."
        );

        return;

    }


    let itemsHTML = "";


    bill.items.forEach(function(item) {

        const price =
            Number(item.price) || 0;

        const qty =
            Number(item.qty) || 0;

        const total =
            price * qty;


        itemsHTML += `

    <div class="item">

        <span>
            ${item.name}
        </span>

        <span>
            ${qty}
        </span>

        <span>
            ₹${price.toFixed(2)}
        </span>

        <strong>
            ₹${total.toFixed(2)}
        </strong>

    </div>

`;
    });


    const payment =
        bill.payment || "Cash";
        // ============================================================
// 🏪 BUSINESS DETAILS FOR PRINT
// ============================================================

const businessName =
    localStorage.getItem(
        "spicyStationBusinessName"
    ) || "My Business";

const businessPhone =
    localStorage.getItem(
        "spicyStationBusinessPhone"
    ) || "";

const businessAddress =
    localStorage.getItem(
        "spicyStationBusinessAddress"
    ) || "";
    printWindow.document.write(`

        <!DOCTYPE html>

        <html>

        <head>

            <title>
                Spicy Station - Bill #${bill.id}
            </title>


            <style>
@page {
    size: ${paperSize}mm auto;
    margin: 0;
}
                * {
                    box-sizing: border-box;
                }


                body {

                    margin: 0;

                    padding: 12px;

                    background: #ffffff;

                    color: #000000;

                    font-family:
                        Arial,
                        sans-serif;

                }


                .receipt {

                    width: 100%;

                    max-width: 300px;

                    margin: auto;

                }


                h2 {

                    text-align: center;

                    margin: 0 0 6px;

                    font-size: 20px;

                }


                p {

                    text-align: center;

                    margin: 4px 0;

                    font-size: 12px;

                }


                hr {

                    border: none;

                    border-top:
                        1px dashed #000;

                    margin: 10px 0;

                }


    
}
.item {

    display: grid;

    grid-template-columns:
        minmax(0, 1fr)
        30px
        52px
        58px;

    gap: 3px;

    align-items: center;

    margin: 5px 0;

    font-size: 10px;

}


.item span:first-child {

    overflow: hidden;

    text-overflow: ellipsis;

    white-space: nowrap;

}


.item span:nth-child(2) {

    text-align: center;

}


.item span:nth-child(3),
.item strong {

    text-align: right;

    white-space: nowrap;

}


.item-header {

    display: grid;

    grid-template-columns:
        minmax(0, 1fr)
        30px
        52px
        58px;

    gap: 3px;

    margin-bottom: 5px;

    font-size: 9px;

    font-weight: bold;

}


.item-header strong:nth-child(2) {

    text-align: center;

}


.item-header strong:nth-child(3),
.item-header strong:nth-child(4) {

    text-align: right;

}

                .total {

                    display: flex;

                    justify-content:
                        space-between;

                    font-size: 16px;

                    font-weight: bold;

                }


                .payment {

                    text-align: center;

                    margin-top: 10px;

                    font-size: 12px;

                }


                @media print {

                    body {

                        padding: 5px;

                    }

                }

            </style>

        </head>


        <body>

            <div class="receipt">

                <h2>
    ${businessName}
</h2>

${
    businessPhone
    ? `<p>📞 ${businessPhone}</p>`
    : ""
}

${
    businessAddress
    ? `<p>📍 ${businessAddress}</p>`
    : ""
}


                <p>
                    BILL #${bill.id}
                </p>


                <p>
                    ${bill.date}
                </p>


                <hr>


                ${itemsHTML}


                <hr>


                <div class="total">

                    <span>
                        TOTAL
                    </span>

                    <span>
                        ₹${Number(
                            bill.total
                        ).toFixed(2)}
                    </span>

                </div>


                <div class="payment">

                    Payment:
                    ${payment}

                </div>

            </div>

        </body>

        </html>

    `);


    printWindow.document.close();

    printWindow.focus();


    setTimeout(function() {

        printWindow.print();

    }, 300);

}

// ============================================================
// 👨‍🍳 STAFF MANAGEMENT
// ============================================================

function showStaffManagement() {

    showScreen("staff-management-screen");


    const screen =
        document.getElementById(
            "staff-management-screen"
        );


    if (!screen) return;


    screen.innerHTML = `

        <header class="page-header">

            <button
                type="button"
                onclick="backHome()"
            >
                ←
            </button>

            <h2>
                👨‍🍳 Staff
            </h2>

            <div></div>

        </header>


        <main class="staff-container">

            <div class="staff-header">

                <div>

                    <h3>
                        👥 Staff List
                    </h3>

                    <span id="staff-count">
                        0 Staff
                    </span>

                </div>


                <button
                    type="button"
                    class="primary-btn"
                    onclick="showAddStaffForm()"
                >
                    ➕ Add Staff
                </button>

            </div>


            <div
                id="staff-list"
                class="staff-list"
            ></div>

        </main>

    `;


    renderStaffList();

}
// ============================================================
// 👨‍🍳 STAFF LIST + ATTENDANCE
// ============================================================

function renderStaffList() {

    const container =
        document.getElementById("staff-list");

    const count =
        document.getElementById("staff-count");


    if (!container) return;


    container.innerHTML = "";


    if (typeof staffList === "undefined") {

        window.staffList = [];

    }


    if (typeof staffAttendance === "undefined") {

        window.staffAttendance = {};

    }


    if (count) {

        count.textContent =
            staffList.length + " Staff";

    }


    if (staffList.length === 0) {

        container.innerHTML = `

            <div class="no-staff">

                👥 Abhi koi staff add nahi hai.

            </div>

        `;

        return;

    }


    const today =
        new Date().toISOString().split("T")[0];


    staffList.forEach(function(staff) {

        const key =
            staff.id + "_" + today;


        const attendance =
            staffAttendance[key] || "Not Marked";


        const card =
            document.createElement("div");


        card.className =
            "staff-card";


        card.innerHTML = `

            <div class="staff-avatar">
                👨‍🍳
            </div>


            <div class="staff-info">

                <strong>
                    ${staff.name}
                </strong>

                <span>
                    💰 Salary: ₹${staff.salary}
                </span>

                <small>
                    💵 Advance: ₹${staff.advance || 0}
                </small>

                <small>
                    📅 Today:
                    <b>
                        ${attendance}
                    </b>
                </small>

            </div>


            <div class="staff-actions">

                <button
                    type="button"
                    onclick="markStaffAttendance(${staff.id}, 'Present')"
                >
                    ✅
                </button>


                <button
                    type="button"
                    onclick="markStaffAttendance(${staff.id}, 'Absent')"
                >
                    ❌
                </button>


                <button
                    type="button"
                    onclick="markStaffAttendance(${staff.id}, 'Full Duty')"
                >
                    🟢
                </button>


                <button
                    type="button"
                    onclick="markStaffAttendance(${staff.id}, 'Half Duty')"
                >
                    🟡
                </button>


                <button
                    type="button"
                    onclick="editStaff(${staff.id})"
                >
                    ✏️
                </button>
<button
    type="button"
    onclick="showStaffAccount(${staff.id})"
>
    💰
</button>
            </div>

        `;


        container.appendChild(card);

    });

}
// ============================================================
// 📅 MARK STAFF ATTENDANCE
// ============================================================

function markStaffAttendance(staffId, status) {

    if (typeof staffAttendance === "undefined") {

        window.staffAttendance = {};

    }


    const today =
        new Date().toISOString().split("T")[0];


    const key =
        staffId + "_" + today;


    staffAttendance[key] =
        status;
saveAllData();

    renderStaffList();


    alert(
        "✅ Attendance save ho gaya:\n\n" +
        status
    );

}
// ============================================================
// 💰 STAFF MONTHLY ACCOUNT
// ============================================================

function showStaffAccount(staffId) {

    const staff =
        staffList.find(function(staff) {

            return staff.id === staffId;

        });


    if (!staff) {

        alert("⚠️ Staff nahi mila.");

        return;

    }


    const now =
        new Date();


    const year =
        now.getFullYear();


    const month =
        now.getMonth();


    const daysInMonth =
        new Date(
            year,
            month + 1,
            0
        ).getDate();


    const dailySalary =
        Number(staff.salary) /
        daysInMonth;


    let fullDays = 0;

    let halfDays = 0;

    let presentDays = 0;

    let absentDays = 0;


    for (
        let day = 1;
        day <= daysInMonth;
        day++
    ) {

        const date =
            new Date(
                year,
                month,
                day
            );


        const dateString =
            date.toISOString()
            .split("T")[0];


        const key =
            staff.id +
            "_" +
            dateString;


        const status =
            staffAttendance[key];


        if (
            status === "Full Duty"
        ) {

            fullDays++;

        }

        else if (
            status === "Half Duty"
        ) {

            halfDays++;

        }

        else if (
            status === "Present"
        ) {

            presentDays++;

        }

        else if (
            status === "Absent"
        ) {

            absentDays++;

        }

    }


    const paidDays =
        fullDays +
        presentDays +
        (halfDays * 0.5);


    const earnedSalary =
        dailySalary *
        paidDays;


    const advance =
        Number(
            staff.advance
        ) || 0;


    const netSalary =
        Math.max(
            0,
            earnedSalary - advance
        );


    alert(

        "👨‍🍳 STAFF ACCOUNT\n\n" +

        "Name: " +
        staff.name +

        "\n\n" +

        "💰 Monthly Salary: ₹" +
        Number(staff.salary)
        .toFixed(2) +

        "\n" +

        "📅 Full Duty: " +
        fullDays +

        "\n" +

        "🟡 Half Duty: " +
        halfDays +

        "\n" +

        "✅ Present: " +
        presentDays +

        "\n" +

        "❌ Absent: " +
        absentDays +

        "\n\n" +

        "📊 Paid Days: " +
        paidDays +

        "\n" +

        "💵 Earned Salary: ₹" +
        earnedSalary
        .toFixed(2) +

        "\n" +

        "💸 Advance: ₹" +
        advance
        .toFixed(2) +

        "\n\n" +

        "💰 NET SALARY: ₹" +
        netSalary
        .toFixed(2)

    );

}
// ============================================================
// 👨‍🍳 STAFF SALARY FOR REPORT
// ============================================================

function calculateStaffSalaryForPeriod(
    fromDate,
    toDate
) {

    let totalSalary = 0;

    let totalAdvance = 0;

    let staffDetails = [];


    if (
        typeof staffList === "undefined"
    ) {

        return {
            totalSalary: 0,
            totalAdvance: 0,
            staffDetails: []
        };

    }


    staffList.forEach(
        function(staff) {

            const monthlySalary =
                Number(staff.salary) || 0;


            let earnedSalary = 0;

            let fullDays = 0;

            let halfDays = 0;

            let presentDays = 0;

            let absentDays = 0;


            const start =
                new Date(
                    fromDate + "T00:00:00"
                );


            const end =
                new Date(
                    toDate + "T00:00:00"
                );


            for (
                let date = new Date(start);
                date <= end;
                date.setDate(
                    date.getDate() + 1
                )
            ) {

                const year =
                    date.getFullYear();


                const month =
                    date.getMonth();


                const daysInMonth =
                    new Date(
                        year,
                        month + 1,
                        0
                    ).getDate();


                const dailySalary =
                    monthlySalary /
                    daysInMonth;


                const dateString =
                    year +
                    "-" +
                    String(
                        month + 1
                    ).padStart(2, "0") +
                    "-" +
                    String(
                        date.getDate()
                    ).padStart(2, "0");


                const key =
                    staff.id +
                    "_" +
                    dateString;


                const status =
                    staffAttendance[key];


                if (
                    status === "Full Duty"
                ) {

                    fullDays++;

                    earnedSalary +=
                        dailySalary;

                }

                else if (
                    status === "Half Duty"
                ) {

                    halfDays++;

                    earnedSalary +=
                        dailySalary * 0.5;

                }

                else if (
                    status === "Present"
                ) {

                    presentDays++;

                    earnedSalary +=
                        dailySalary;

                }

                else if (
                    status === "Absent"
                ) {

                    absentDays++;

                }

            }


            const advance =
                Number(
                    staff.advance
                ) || 0;


            const netSalary =
                Math.max(
                    0,
                    earnedSalary - advance
                );


            totalSalary +=
                netSalary;


            totalAdvance +=
                advance;


            staffDetails.push({

                name: staff.name,

                fullDays: fullDays,

                halfDays: halfDays,

                presentDays: presentDays,

                absentDays: absentDays,

                earnedSalary:
                    earnedSalary,

                advance:
                    advance,

                netSalary:
                    netSalary

            });

        }
    );


    return {

        totalSalary:
            totalSalary,

        totalAdvance:
            totalAdvance,

        staffDetails:
            staffDetails

    };

}
// ============================================================
// ➕ ADD STAFF FORM
// ============================================================

function showAddStaffForm() {

    const name =
        prompt("👤 Staff ka naam enter karo:");


    if (name === null) return;


    const cleanName =
        name.trim();


    if (!cleanName) {

        alert(
            "⚠️ Staff name empty nahi ho sakta."
        );

        return;

    }


    const salary =
        prompt(
            "💰 Monthly Salary:",
            "10000"
        );


    if (salary === null) return;


    const salaryAmount =
        Number(salary);


    if (!salaryAmount || salaryAmount <= 0) {

        alert(
            "⚠️ Valid salary enter karo."
        );

        return;

    }


    const advance =
        prompt(
            "💵 Advance:",
            "0"
        );


    if (advance === null) return;


    const advanceAmount =
        Number(advance) || 0;


    staffList.push({

        id: Date.now(),

        name: cleanName,

        salary: salaryAmount,

        advance: advanceAmount

    });
saveAllData();

    renderStaffList();


    alert(
        "✅ Staff successfully add ho gaya."
    );

}


// ============================================================
// ✏️ EDIT STAFF
// ============================================================

function editStaff(staffId) {

    const staff =
        staffList.find(function(staff) {

            return staff.id === staffId;

        });


    if (!staff) {

        alert("⚠️ Staff nahi mila.");

        return;

    }


    const newName =
        prompt(
            "👤 Staff Name:",
            staff.name
        );


    if (newName === null) return;


    const newSalary =
        prompt(
            "💰 Monthly Salary:",
            staff.salary
        );


    if (newSalary === null) return;


    const newAdvance =
        prompt(
            "💵 Advance:",
            staff.advance || 0
        );


    if (newAdvance === null) return;


    staff.name =
        newName.trim();


    staff.salary =
        Number(newSalary);


    staff.advance =
        Number(newAdvance) || 0;

saveAllData();
    renderStaffList();


    alert(
        "✅ Staff details update ho gayi."
    );

}

// ============================================================
// 💸 INVESTMENT / EXPENSE
// ============================================================

function showInvestment() {

    showScreen("investment-screen");


    const screen =
        document.getElementById(
            "investment-screen"
        );


    if (!screen) return;


    if (typeof investments === "undefined") {

        window.investments = [];

    }


    screen.innerHTML = `

        <header class="page-header">

            <button
                type="button"
                onclick="backHome()"
            >
                ←
            </button>

            <h2>
                💸 Investment
            </h2>

            <div></div>

        </header>


        <main class="investment-container">

            <div class="investment-summary">

                <span>
                    💰 Total Investment
                </span>

                <strong id="total-investment">
                    ₹0.00
                </strong>

            </div>


            <div class="investment-form">

                <h3>
                    ➕ Add Expense
                </h3>


                <select id="investment-category">

                    <option value="Gas">
                        🔥 Gas
                    </option>

                    <option value="Grocery">
                        🛒 Grocery
                    </option>

                    <option value="Vegetables">
                        🥬 Vegetables
                    </option>

                    <option value="Staff Salary">
                        👨‍🍳 Staff Salary
                    </option>

                    <option value="Other">
                        📦 Other
                    </option>

                </select>


                <input
                    type="number"
                    id="investment-amount"
                    placeholder="💰 Amount"
                    min="1"
                >


                <input
                    type="text"
                    id="investment-note"
                    placeholder="📝 Note / Details"
                >


                <button
                    type="button"
                    class="primary-btn"
                    onclick="addInvestment()"
                >
                    ➕ Save Investment
                </button>

            </div>


            <div class="investment-history">

                <h3>
                    📜 Investment History
                </h3>


                <div
                    id="investment-list"
                ></div>

            </div>

        </main>

    `;


    renderInvestments();

}
// ============================================================
// ➕ ADD INVESTMENT
// ============================================================

function addInvestment() {

    const category =
        document.getElementById(
            "investment-category"
        ).value;


    const amount =
        Number(
            document.getElementById(
                "investment-amount"
            ).value
        );


    const note =
        document.getElementById(
            "investment-note"
        ).value.trim();


    if (!amount || amount <= 0) {

        alert(
            "⚠️ Valid amount enter karo."
        );

        return;

    }


    investments.push({

        id: Date.now(),

        category: category,

        amount: amount,

        note: note,

        date: new Date().toLocaleString()

    });


    saveAllData();


    renderInvestments();


    document.getElementById(
        "investment-amount"
    ).value = "";


    document.getElementById(
        "investment-note"
    ).value = "";


    alert(
        "✅ Investment save ho gaya."
    );

}
// ============================================================
// 📜 RENDER INVESTMENTS
// ============================================================
function renderInvestments() {

    const container =
        document.getElementById(
            "investment-list"
        );


    const totalElement =
        document.getElementById(
            "total-investment"
        );


    if (!container) return;


    container.innerHTML = "";


    let total = 0;


    investments.forEach(function(investment) {

        total +=
            Number(investment.amount) || 0;


        const card =
            document.createElement("div");


        card.className =
            "investment-card";


        card.innerHTML = `

            <div class="investment-card-info">

                <strong>
                    ${investment.category}
                </strong>

                <span>
                    ${investment.note || "No details"}
                </span>

                <small>
                    ${investment.date}
                </small>

            </div>


            <strong class="investment-amount">
                ₹${Number(investment.amount).toFixed(2)}
            </strong>

        `;


        container.appendChild(card);

    });


    if (totalElement) {

        totalElement.textContent =
            "₹" + total.toFixed(2);

    }


    if (investments.length === 0) {

        container.innerHTML = `

            <div class="no-investment">

                📭 Abhi koi investment nahi hai.

            </div>

        `;

    }

}


// ============================================================
// 📈 BUSINESS REPORT
// ============================================================

function showBusinessReport() {

    showScreen("business-report-screen");


    const screen =
        document.getElementById(
            "business-report-screen"
        );


    if (!screen) return;


    screen.innerHTML = `

        <header class="page-header">

            <button
                type="button"
                onclick="backHome()"
            >
                ←
            </button>

            <h2>
                📈 Business Report
            </h2>

            <div></div>

        </header>


        <main class="business-report-container">

            <div class="report-date-box">

                <h3>
                    📅 Select Report Period
                </h3>


                <label>
                    From Date
                </label>

                <input
                    type="date"
                    id="report-from-date"
                >


                <label>
                    To Date
                </label>

                <input
                    type="date"
                    id="report-to-date"
                >


                <button
                    type="button"
                    class="primary-btn"
                    onclick="generateBusinessReport()"
                >
                    📄 Generate Report
                </button>

            </div>


            <div id="business-report-result">

                <div class="no-item-sales">

                    📅 Date select karke
                    Generate Report dabao.

                </div>

            </div>

        </main>

    `;

}

// ============================================================
// 📊 GENERATE BUSINESS REPORT
// ============================================================

function generateBusinessReport() {

    const fromDate =
        document.getElementById(
            "report-from-date"
        ).value;


    const toDate =
        document.getElementById(
            "report-to-date"
        ).value;


    if (!fromDate || !toDate) {

        alert(
            "⚠️ From Date aur To Date select karo."
        );

        return;

    }


    if (fromDate > toDate) {

        alert(
            "⚠️ From Date, To Date se pehle hona chahiye."
        );

        return;

    }


    // ========================================================
    // 💰 SALES
    // ========================================================

    let totalSales = 0;

    let cashSales = 0;

    let upiSales = 0;

    let totalItemsSold = 0;

    let selectedBills = [];


    bills.forEach(function(bill) {

        const billDate =
            new Date(bill.date);


        if (isNaN(billDate.getTime())) {

            return;

        }


        const date =
            billDate
            .toISOString()
            .split("T")[0];


        if (
            date >= fromDate &&
            date <= toDate
        ) {

            const amount =
                Number(bill.total) || 0;


            totalSales += amount;


            if (bill.payment === "UPI") {

                upiSales += amount;

            } else {

                cashSales += amount;

            }


            selectedBills.push(bill);


            if (
                Array.isArray(
                    bill.items
                )
            ) {

                bill.items.forEach(
                    function(item) {

                        totalItemsSold +=
                            Number(
                                item.qty
                            ) || 0;

                    }
                );

            }

        }

    });


    // ========================================================
    // 💸 INVESTMENTS
    // ========================================================

    let totalInvestment = 0;

    let selectedInvestments = [];


    if (
        typeof investments !==
        "undefined"
    ) {

        investments.forEach(
            function(investment) {

                const investmentDate =
                    new Date(
                        investment.date
                    );


                if (
                    isNaN(
                        investmentDate.getTime()
                    )
                ) {

                    return;

                }


                const date =
                    investmentDate
                    .toISOString()
                    .split("T")[0];


                if (
                    date >= fromDate &&
                    date <= toDate
                ) {

                    const amount =
                        Number(
                            investment.amount
                        ) || 0;


                    totalInvestment +=
                        amount;


                    selectedInvestments.push(
                        investment
                    );

                }

            }
        );

    }


    // ========================================================
    // 👨‍🍳 STAFF SALARY
    // ========================================================

    const staffReport =
        calculateStaffSalaryForPeriod(
            fromDate,
            toDate
        );


    const totalStaffSalary =
        staffReport.totalSalary;


    // ========================================================
    // 📈 FINAL PROFIT
    // ========================================================

    const netProfit =
        totalSales -
        totalInvestment -
        totalStaffSalary;


    const result =
        document.getElementById(
            "business-report-result"
        );


    if (!result) return;


    // ========================================================
    // 🧾 REPORT DISPLAY
    // ========================================================

    result.innerHTML = `

        <div
            id="print-business-report"
            class="print-business-report"
        >


            <!-- HEADER -->

            <div class="report-print-header">

                <h2>
                    🌶️ Spicy Station Fast Food
                </h2>

                <h3>
                    📈 BUSINESS REPORT
                </h3>

                <p>
                    ${fromDate}
                    →
                    ${toDate}
                </p>

            </div>


            <!-- TOTAL SALES -->

            <div class="report-card sales">

                <span>
                    💰 Total Sales
                </span>

                <strong>
                    ₹${totalSales.toFixed(2)}
                </strong>

            </div>


            <!-- INVESTMENT -->

            <div class="report-card expense">

                <span>
                    💸 Total Investment
                </span>

                <strong>
                    ₹${totalInvestment.toFixed(2)}
                </strong>

            </div>


            <!-- STAFF SALARY -->

            <div class="report-card expense">

                <span>
                    👨‍🍳 Staff Salary
                </span>

                <strong>
                    ₹${totalStaffSalary.toFixed(2)}
                </strong>

            </div>


            <!-- NET PROFIT -->

            <div class="report-card profit">

                <span>
                    📈 Net Profit
                </span>

                <strong>
                    ₹${netProfit.toFixed(2)}
                </strong>

            </div>


            <!-- SALES DETAILS -->

            <div class="report-details">

                <h3>
                    📊 Sales Details
                </h3>


                <div class="report-row">

                    <span>
                        💵 Cash Sales
                    </span>

                    <strong>
                        ₹${cashSales.toFixed(2)}
                    </strong>

                </div>


                <div class="report-row">

                    <span>
                        📱 UPI Sales
                    </span>

                    <strong>
                        ₹${upiSales.toFixed(2)}
                    </strong>

                </div>


                <div class="report-row">

                    <span>
                        🍔 Total Items Sold
                    </span>

                    <strong>
                        ${totalItemsSold}
                    </strong>

                </div>


                <div class="report-row">

                    <span>
                        🧾 Total Bills
                    </span>

                    <strong>
                        ${selectedBills.length}
                    </strong>

                </div>

            </div>


            <!-- BILL DETAILS -->

            <div class="report-details">

                <h3>
                    🧾 Bills
                </h3>


                ${
                    selectedBills.length === 0

                    ?

                    `
                    <p>
                        No bills in this period.
                    </p>
                    `

                    :

                    selectedBills
                    .map(function(bill) {

                        return `

                            <div
                                class="report-row"
                            >

                                <span>

                                    🧾
                                    ${bill.date}

                                    <br>

                                    <small>
                                        ${
                                            bill.payment ||
                                            "Cash"
                                        }
                                    </small>

                                </span>


                                <strong>

                                    ₹${Number(
                                        bill.total
                                    ).toFixed(2)}

                                </strong>

                            </div>

                        `;

                    })
                    .join("")

                }

            </div>


            <!-- INVESTMENT DETAILS -->

            <div class="report-details">

                <h3>
                    💸 Investment Details
                </h3>


                ${
                    selectedInvestments.length === 0

                    ?

                    `
                    <p>
                        No investments in this period.
                    </p>
                    `

                    :

                    selectedInvestments
                    .map(function(investment) {

                        return `

                            <div
                                class="report-row"
                            >

                                <span>

                                    ${
                                        investment.category ||
                                        "Other"
                                    }

                                    ${
                                        investment.note
                                        ? "<br><small>" +
                                          investment.note +
                                          "</small>"
                                        : ""
                                    }

                                </span>


                                <strong>

                                    ₹${Number(
                                        investment.amount
                                    ).toFixed(2)}

                                </strong>

                            </div>

                        `;

                    })
                    .join("")

                }

            </div>


            <!-- STAFF DETAILS -->

            <div class="report-details">

                <h3>
                    👨‍🍳 Staff Salary Details
                </h3>


                ${
                    staffReport.staffDetails.length === 0

                    ?

                    `
                    <p>
                        No staff data.
                    </p>
                    `

                    :

                    staffReport.staffDetails
                    .map(function(staff) {

                        return `

                            <div
                                class="report-row"
                            >

                                <span>

                                    👨‍🍳
                                    ${staff.name}

                                    <br>

                                    <small>

                                        Full:
                                        ${staff.fullDays}

                                        |

                                        Half:
                                        ${staff.halfDays}

                                        |

                                        Present:
                                        ${staff.presentDays}

                                        |

                                        Absent:
                                        ${staff.absentDays}

                                    </small>

                                </span>


                                <strong>

                                    ₹${staff.netSalary.toFixed(2)}

                                </strong>

                            </div>

                        `;

                    })
                    .join("")

                }

            </div>


            <!-- FINAL SUMMARY -->

            <div class="report-details">

                <h3>
                    📋 Final Summary
                </h3>


                <div class="report-row">

                    <span>
                        💰 Sales
                    </span>

                    <strong>
                        ₹${totalSales.toFixed(2)}
                    </strong>

                </div>


                <div class="report-row">

                    <span>
                        💸 Investment
                    </span>

                    <strong>
                        ₹${totalInvestment.toFixed(2)}
                    </strong>

                </div>


                <div class="report-row">

                    <span>
                        👨‍🍳 Staff Salary
                    </span>

                    <strong>
                        ₹${totalStaffSalary.toFixed(2)}
                    </strong>

                </div>


                <div class="report-row">

                    <span>
                        📈 FINAL PROFIT
                    </span>

                    <strong>
                        ₹${netProfit.toFixed(2)}
                    </strong>

                </div>

            </div>


        </div>


        <!-- PDF BUTTON -->

        <button
            type="button"
            class="primary-btn"
            onclick="printBusinessReport()"
        >
            📄 Save / Print PDF
        </button>

    `;

}
// ============================================================
// 📄 PRINT / SAVE BUSINESS REPORT AS PDF
// ============================================================

function printBusinessReport() {

    const report =
        document.getElementById(
            "print-business-report"
        );


    if (!report) {

        alert(
            "⚠️ Pehle report generate karo."
        );

        return;

    }


    const printWindow =
        window.open(
            "",
            "_blank"
        );


    if (!printWindow) {

        alert(
            "⚠️ Popup blocked hai. Browser popup allow karo."
        );

        return;

    }


    printWindow.document.write(`

        <html>

        <head>

            <title>
                Spicy Station Business Report
            </title>

            <style>

                body {
                    font-family: Arial, sans-serif;
                    padding: 25px;
                    color: #111;
                }

                h2,
                h3 {
                    text-align: center;
                }

                .report-print-header {
                    text-align: center;
                    margin-bottom: 25px;
                }

                .report-card,
                .report-details {
                    border: 1px solid #ccc;
                    padding: 15px;
                    margin-bottom: 12px;
                    border-radius: 10px;
                }

                .report-card span {
                    display: block;
                    margin-bottom: 6px;
                }

                .report-card strong {
                    font-size: 22px;
                }

                .report-row {
                    display: flex;
                    justify-content: space-between;
                    padding: 9px 0;
                    border-bottom: 1px solid #eee;
                }

                .report-row:last-child {
                    border-bottom: none;
                }

                @media print {

                    body {
                        padding: 10px;
                    }

                }

            </style>

        </head>


        <body>

            ${report.innerHTML}

        </body>

        </html>

    `);


    printWindow.document.close();


    printWindow.focus();


    setTimeout(
        function() {

            printWindow.print();

        },
        500
    );

}
// ============================================================
// 📂 RENDER CATEGORIES
// ============================================================

function renderCategories() {

    const container =
        document.getElementById("menu-category-bar");

    if (!container) return;


    const categories = [
        "All",
        ...new Set(
            items.map(function(item) {

                return item.category;

            })
        )
    ];


    container.innerHTML = "";


    categories.forEach(function(category) {

        const button =
            document.createElement("button");


        button.type = "button";

        button.textContent = category;


        button.onclick = function() {

            renderMenu(category);

        };


        container.appendChild(button);

    });

}


// ============================================================
// 🍔 MENU DIKHANA
// ============================================================

function renderMenu(category = "All") {

    const container =
        document.getElementById("menu-list");

    if (!container) return;


    container.innerHTML = "";


    const filteredItems =
        category === "All"
            ? items
            : items.filter(function(item) {

                return item.category === category;

            });


    filteredItems.forEach(function(item) {

        const card =
            document.createElement("div");

        card.className = "menu-card";


        // Photo hai to photo dikhao
        const photoHTML =
            item.photo
                ? `
                    <img
                        src="${item.photo}"
                        class="menu-item-photo"
                        alt="${item.name}"
                    >
                  `
                : `
                    <div class="menu-item-no-photo">
                        🍔
                    </div>
                  `;


        card.innerHTML = `

            ${photoHTML}

            <h3>
                ${item.name}
            </h3>

            <p>
                ₹${item.price}
            </p>

            <button
                type="button"
                onclick="addToBill(${item.id})"
            >
                ➕ Add
            </button>

        `;


        container.appendChild(card);

    });

}

// ============================================================
// ➕ ADD TO BILL
// ============================================================

function addToBill(itemId) {

    const item =
        items.find(function(item) {

            return item.id === itemId;

        });


    if (!item) return;


    const existing =
        currentBill.find(function(billItem) {

            return billItem.id === itemId;

        });


    if (existing) {

        existing.qty++;

    } else {

        currentBill.push({

            id: item.id,
            name: item.name,
            price: item.price,
            qty: 1

        });

    }


    updateBill();

}


// ============================================================
// 🔄 UPDATE BILL
// ============================================================

function updateBill() {

    const container =
        document.getElementById("bill-items");

    const totalElement =
        document.getElementById("bill-total");

    const basketCount =
        document.getElementById("basket-count");


    if (!container) return;


    container.innerHTML = "";


    let total = 0;

    let quantity = 0;


    currentBill.forEach(function(item) {

        const itemTotal =
            item.price * item.qty;


        total += itemTotal;

        quantity += item.qty;


        const row =
            document.createElement("div");


        row.innerHTML = `

            <strong>
                ${item.name}
            </strong>

            <span>
                ₹${itemTotal}
            </span>

            <button
                type="button"
                onclick="changeQty(${item.id}, -1)"
            >
                −
            </button>

            <span>
                ${item.qty}
            </span>

            <button
                type="button"
                onclick="changeQty(${item.id}, 1)"
            >
                +
            </button>

        `;


        container.appendChild(row);

    });


    if (totalElement) {

        totalElement.textContent =
            "₹" + total.toFixed(2);

    }


    if (basketCount) {

        basketCount.textContent =
            quantity;

    }

}


// ============================================================
// ➕➖ CHANGE QUANTITY
// ============================================================

function changeQty(itemId, amount) {

    const item =
        currentBill.find(function(item) {

            return item.id === itemId;

        });


    if (!item) return;


    item.qty += amount;


    if (item.qty <= 0) {

        currentBill =
            currentBill.filter(function(billItem) {

                return billItem.id !== itemId;

            });

    }


    updateBill();

}


// ============================================================
// 🛒 OPEN BASKET
// ============================================================

function openBasket() {

    const panel =
        document.getElementById("basket-panel");

    if (!panel) return;


    panel.style.display = "flex";


    renderBasket();

}


// ============================================================
// 🛒 CLOSE BASKET
// ============================================================

function closeBasket() {

    const panel =
        document.getElementById("basket-panel");

    if (!panel) return;


    panel.style.display = "none";

}


// ============================================================
// 🛒 RENDER BASKET
// ============================================================

function renderBasket() {

    const container =
        document.getElementById("basket-items");

    const totalElement =
        document.getElementById("basket-total");


    if (!container) return;


    container.innerHTML = "";


    let total = 0;


    currentBill.forEach(function(item) {

        const itemTotal =
            item.price * item.qty;


        total += itemTotal;


        const row =
            document.createElement("div");


        row.innerHTML = `

            <strong>
                ${item.name}
            </strong>

            <span>
                × ${item.qty}
            </span>

            <span>
                ₹${itemTotal}
            </span>

        `;


        container.appendChild(row);

    });


    if (totalElement) {

        totalElement.textContent =
            "₹" + total.toFixed(2);

    }

}


// ============================================================
// 💳 OPEN PAYMENT
// ============================================================

function openPayment() {

    const basket =
        document.getElementById("basket-panel");

    const payment =
        document.getElementById("payment-panel");


    if (basket) {

        basket.style.display = "none";

    }


    if (payment) {

        payment.style.display = "flex";

    }

}


// ============================================================
// ❌ CLOSE PAYMENT
// ============================================================

function closePayment() {

    const payment =
        document.getElementById("payment-panel");

    if (!payment) return;


    payment.style.display = "none";

}


// ============================================================
// 💵 PAYMENT METHOD
// ============================================================

function selectPayment(method) {

    selectedPayment = method;


    alert(
        "Payment Method Selected: " + method
    );

}


// ============================================================
// 💾 BILL SAVE KARNA
// ============================================================

function saveBill() {

    if (currentBill.length === 0) {

        alert("⚠️ Bill empty hai.");

        return;

    }


    let total = 0;


    currentBill.forEach(function(item) {

        total += item.price * item.qty;

    });


    const bill = {

        id: Date.now(),

        date: new Date().toLocaleString(),

        items: JSON.parse(
            JSON.stringify(currentBill)
        ),

        total: total,

        payment: selectedPayment || "Cash"

    };


    // 💾 Bill ko save karo
    bills.push(bill);
saveAllData();

    // 💰 Today's Sales turant update karo
    updateTodaySales();


    alert(
        "✅ Bill successfully save ho gaya!\n\n" +
        "Total: ₹" +
        total.toFixed(2)
    );


    // Current bill clear
    currentBill = [];

    selectedPayment = "";


    updateBill();

}
// ============================================================
// 💰 TODAY'S SALES
// ============================================================

function updateTodaySales() {

    const element =
        document.getElementById("today-sales");

    if (!element) return;


    let total = 0;


    bills.forEach(function(bill) {

        total += bill.total;

    });


    element.textContent =
        "₹" + total.toFixed(2);

}


// ============================================================
// 🚀 INITIALIZE
// ============================================================

document.addEventListener(
    "DOMContentLoaded",
    function() {

        updateTodaySales();

    }
);
// ============================================================
// 📱 ANDROID MOBILE BACK BUTTON
// ============================================================

window.addEventListener("popstate", function () {

    handleAppBackButton();

});


// ============================================================
// 🔙 BACK BUTTON HANDLER
// ============================================================

function handleAppBackButton() {

    // Payment open hai
    const payment =
        document.getElementById("payment-panel");

    if (
        payment &&
        payment.style.display !== "none"
    ) {

        closePayment();

        return;
    }


    // Basket open hai
    const basket =
        document.getElementById("basket-panel");

    if (
        basket &&
        basket.style.display !== "none"
    ) {

        closeBasket();

        return;
    }


    // Current visible screen
    const screens =
        document.querySelectorAll(".screen");

    let currentScreen = null;


    screens.forEach(function (screen) {

        if (
            screen.style.display !== "none" &&
            getComputedStyle(screen).display !== "none"
        ) {

            currentScreen = screen.id;

        }

    });


    // Dashboard par hain
    if (currentScreen === "dashboard-screen") {

        return;

    }


    // Kisi bhi inner screen se Dashboard
    showScreen("dashboard-screen");

}


// ============================================================
// 📱 ANDROID BACK SUPPORT
// ============================================================

function enableMobileBackButton() {

    history.pushState(
        {
            appScreen: "dashboard"
        },
        "",
        ""
    );


    window.addEventListener(
        "popstate",
        function () {

            history.pushState(
                {
                    appScreen: "dashboard"
                },
                "",
                ""
            );

            handleAppBackButton();

        }
    );

}


// ============================================================
// 🚀 START MOBILE BACK CONTROL
// ============================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        enableMobileBackButton();

    }
);
// ============================================================
// ➕ NAYA ITEM ADD KARNA
// ============================================================

function addNewItem() {

    const nameInput =
        document.getElementById("new-item-name");

    const priceInput =
        document.getElementById("new-item-price");

    const categoryInput =
        document.getElementById("new-item-category");

    const photoInput =
        document.getElementById("new-item-photo");


    const name =
        nameInput.value.trim();

    const price =
        Number(priceInput.value);

    const category =
        categoryInput.value;


    // Item name check
    if (!name) {

        alert("⚠️ Item ka naam enter karo.");

        return;

    }


    // Price check
    if (!price || price <= 0) {

        alert("⚠️ Valid price enter karo.");

        return;

    }


    // Photo ka data
    const file =
        photoInput.files[0];


    // Agar photo select ki hai
    if (file) {

        if (!file.type.startsWith("image/")) {

            alert("⚠️ Sirf image select karo.");

            return;

        }


        const reader =
            new FileReader();


        reader.onload = function(event) {

            saveNewItem(
                name,
                price,
                category,
                event.target.result
            );

        };


        reader.readAsDataURL(file);

    }

    // Agar photo select nahi ki
    else {

        saveNewItem(
            name,
            price,
            category,
            ""
        );

    }

}


// ============================================================
// 💾 ITEM SAVE KARNA
// ============================================================

function saveNewItem(
    name,
    price,
    category,
    photo
) {

    const newItem = {

        id: Date.now(),

        name: name,

        price: price,

        category: category,

        photo: photo

    };


    items.push(newItem);
saveAllData();

    alert(
        "✅ Item successfully add ho gaya!\n\n" +
        name +
        " - ₹" +
        price
    );


    // Form clear
    document.getElementById(
        "new-item-name"
    ).value = "";


    document.getElementById(
        "new-item-price"
    ).value = "";


    document.getElementById(
        "new-item-category"
    ).value = "Rice";


    document.getElementById(
        "new-item-photo"
    ).value = "";


    // Menu refresh
    renderCategories();

    renderMenu();


    // Dashboard par wapas
    showScreen(
        "dashboard-screen"
    );

}
// ============================================================
// ➕ ADD NEW MENU ITEM
// ============================================================

function addNewItem() {

    const nameInput =
        document.getElementById("new-item-name");

    const priceInput =
        document.getElementById("new-item-price");

    const categoryInput =
        document.getElementById("new-item-category");


    const name =
        nameInput.value.trim();

    const price =
        Number(priceInput.value);

    const category =
        categoryInput.value;


    if (!name) {

        alert("⚠️ Please enter item name.");

        return;

    }


    if (!price || price <= 0) {

        alert("⚠️ Please enter a valid price.");

        return;

    }


    const newItem = {

        id: Date.now(),

        name: name,

        price: price,

        category: category

    };


    items.push(newItem);


    alert(
        "✅ Item added successfully!\n\n" +
        name +
        " - ₹" +
        price
    );


    nameInput.value = "";

    priceInput.value = "";

    categoryInput.value = "Rice";


    renderCategories();

    renderMenu();


    showScreen("dashboard-screen");

}
// ============================================================
// ✏️ ITEM MANAGEMENT LIST
// ============================================================

function renderItemManagement() {

    const container =
        document.getElementById("item-management-list");

    if (!container) return;


    container.innerHTML = "";


    if (items.length === 0) {

        container.innerHTML = `
            <p class="no-items">
                📭 Abhi koi item nahi hai.
            </p>
        `;

        return;

    }


    items.forEach(function(item) {

        const row =
            document.createElement("div");

        row.className =
            "item-management-row";


        const photoHTML =
            item.photo
                ? `
                    <img
                        src="${item.photo}"
                        class="management-item-photo"
                        alt="${item.name}"
                        onclick="changeItemPhoto(${item.id})"
                    >
                  `
                : `
                    <div
                        class="management-item-no-photo"
                        onclick="changeItemPhoto(${item.id})"
                    >
                        🍔
                    </div>
                  `;


        row.innerHTML = `

            ${photoHTML}

            <div class="management-item-info">

                <strong>
                    ${item.name}
                </strong>

                <span>
                    ₹${item.price}
                </span>

                <small>
                    ${item.category}
                </small>

            </div>


            <div class="management-item-actions">

                <button
                    type="button"
                    onclick="editItem(${item.id})"
                >
                    ✏️
                </button>

                <button
                    type="button"
                    onclick="deleteItem(${item.id})"
                >
                    🗑️
                </button>

            </div>

        `;


        container.appendChild(row);

    });

}

// ============================================================
// ✏️ ITEM EDIT KARNA
// ============================================================

function editItem(itemId) {

    const item =
        items.find(function(item) {

            return item.id === itemId;

        });


    if (!item) {

        alert("⚠️ Item nahi mila.");

        return;

    }


    const newName =
        prompt(
            "🍔 Item Name:",
            item.name
        );


    if (newName === null) return;


    const cleanName =
        newName.trim();


    if (!cleanName) {

        alert("⚠️ Item name empty nahi ho sakta.");

        return;

    }


    const newPrice =
        prompt(
            "💰 Price:",
            item.price
        );


    if (newPrice === null) return;


    const price =
        Number(newPrice);


    if (!price || price <= 0) {

        alert("⚠️ Valid price enter karo.");

        return;

    }


    const newCategory =
        prompt(
            "📂 Category:",
            item.category
        );


    if (newCategory === null) return;


    const cleanCategory =
        newCategory.trim();


    if (!cleanCategory) {

        alert("⚠️ Category empty nahi ho sakti.");

        return;

    }


    // ========================================================
    // 📸 PHOTO CHANGE
    // ========================================================

    const changePhoto =
        confirm(
            "📸 Kya aap item ki photo change karna chahte ho?"
        );


    if (changePhoto) {

        const photoInput =
            document.createElement("input");

        photoInput.type =
            "file";

        photoInput.accept =
            "image/*";


        photoInput.onchange =
            function() {

                const file =
                    photoInput.files[0];


                if (!file) return;


                if (
                    !file.type.startsWith("image/")
                ) {

                    alert(
                        "⚠️ Sirf image select karo."
                    );

                    return;

                }


                const reader =
                    new FileReader();


                reader.onload =
                    function(event) {

                        item.name =
                            cleanName;

                        item.price =
                            price;

                        item.category =
                            cleanCategory;
                            

                        item.photo =
                            event.target.result;

saveAllData();
                        finishItemEdit();

                    };


                reader.readAsDataURL(file);

            };


        photoInput.click();

    }

    else {

        item.name =
            cleanName;

        item.price =
            price;

        item.category =
            cleanCategory;


        finishItemEdit();

    }

}


// ============================================================
// ✅ EDIT COMPLETE
// ============================================================

function finishItemEdit() {

    renderCategories();

    renderMenu();

    renderItemManagement();


    alert(
        "✅ Item successfully update ho gaya."
    );

}

// ============================================================
// 🗑️ DELETE ITEM
// ============================================================

function deleteItem(itemId) {

    const item =
        items.find(function(item) {

            return item.id === itemId;

        });


    if (!item) {

        alert("⚠️ Item nahi mila.");

        return;

    }


    const confirmDelete =
        confirm(
            "🗑️ Kya aap \"" +
            item.name +
            "\" ko delete karna chahte ho?"
        );


    if (!confirmDelete) return;


    items =
        items.filter(function(item) {

            return item.id !== itemId;

        });
saveAllData();

    renderCategories();

    renderMenu();

    renderItemManagement();


    alert(
        "✅ Item delete ho gaya."
    );

}


// ============================================================
// ➕ ADD ITEM SCREEN OPEN HOTE HI LIST DIKHAO
// ============================================================

const originalShowAddItem =
    showAddItem;


showAddItem = function() {

    originalShowAddItem();

    renderItemManagement();

};
// ============================================================
// 📸 ITEM PHOTO CHANGE KARNA
// ============================================================

function changeItemPhoto(itemId) {

    const item =
        items.find(function(item) {

            return item.id === itemId;

        });


    if (!item) {

        alert("⚠️ Item nahi mila.");

        return;

    }


    const fileInput =
        document.createElement("input");

    fileInput.type = "file";

    fileInput.accept = "image/*";


    fileInput.onchange =
        function() {

            const file =
                fileInput.files[0];


            if (!file) return;


            if (!file.type.startsWith("image/")) {

                alert("⚠️ Sirf image select karo.");

                return;

            }


            const reader =
                new FileReader();


            reader.onload =
                function(event) {

                    item.photo =
                        event.target.result;

saveAllData();
                    renderItemManagement();

                    renderMenu();


                    alert(
                        "✅ Photo successfully change ho gayi."
                    );

                };


            reader.readAsDataURL(file);

        };


    fileInput.click();

}
// ============================================================
// 🗑️ CLEAR ALL DATA
// ============================================================

function clearAllData() {

    openSecurityModal(
        "🗑️ Clear All Data",
        "Admin credentials verify karo.",
        function() {

            openClearConfirmModal();

        }
    );

}
// ============================================================
// ⚠️ CLEAR DATA CONFIRMATION
// ============================================================

function openClearConfirmModal() {

    const confirmDelete = confirm(
        "⚠️ FINAL WARNING!\n\n" +
        "Ye permanently delete karega:\n\n" +
        "🍔 Items\n" +
        "🧾 Bills\n" +
        "👨‍🍳 Staff\n" +
        "📅 Attendance\n" +
        "💸 Investments\n\n" +
        "Kya aap REALLY continue karna chahte ho?"
    );

    if (!confirmDelete) {
        return;
    }


    // 🗑️ DELETE SAVED DATA

    localStorage.removeItem("spicyStationItems");
    localStorage.removeItem("spicyStationBills");
    localStorage.removeItem("spicyStationStaff");
    localStorage.removeItem("spicyStationAttendance");
    localStorage.removeItem("spicyStationInvestments");


    // 🔄 RESET MEMORY

    bills = [];
    currentBill = [];
    staffList = [];
    staffAttendance = {};
    investments = [];


    // ✅ SUCCESS

    alert(
        "✅ All business data successfully clear ho gaya."
    );


    location.reload();
}
// ============================================================
// ⚙️ SETTINGS
// ============================================================

function showSettings() {

    showScreen(
        "settings-screen"
    );

    // 📄 Load saved printer paper size
    loadPrinterPaperSize();

}

// ============================================================
// 🔐 GET SAVED ADMIN CREDENTIALS
// ============================================================

function getAdminCredentials() {

    const savedUserId =
        localStorage.getItem(
            "spicyStationAdminUserId"
        );

    const savedPassword =
        localStorage.getItem(
            "spicyStationAdminPassword"
        );


    return {

        userId:
            savedUserId || "admin",

        password:
            savedPassword || "1234"

    };

}


// ============================================================
// 👤 CHANGE ADMIN USER ID
// ============================================================

function changeAdminUserId() {

    openSecurityModal(
        "👤 Change User ID",
        "Current admin credentials verify karo.",
        function() {

            openNewUserIdModal();

        }
    );

}


// ============================================================
// 👤 NEW USER ID MODAL
// ============================================================

function openNewUserIdModal() {

    const newUserId =
        window.prompt(
            "👤 New User ID enter karo:"
        );


    if (newUserId === null) return;


    const cleanUserId =
        newUserId.trim();


    if (!cleanUserId) {

        alert(
            "⚠️ User ID empty nahi ho sakti."
        );

        return;

    }


    localStorage.setItem(
        "spicyStationAdminUserId",
        cleanUserId
    );


    alert(
        "✅ User ID successfully change ho gayi."
    );

}
// ============================================================
// 🔑 CHANGE PASSWORD
// ============================================================

function changeAdminPassword() {

    const credentials =
        getAdminCredentials();


    const currentPassword =
        prompt(
            "🔑 Current Password enter karo:"
        );


    if (currentPassword === null) return;


    if (
        currentPassword !==
        credentials.password
    ) {

        alert(
            "❌ Current Password galat hai."
        );

        return;

    }


    const newPassword =
        prompt(
            "🔐 New Password:"
        );


    if (newPassword === null) return;


    if (
        newPassword.length < 4
    ) {

        alert(
            "⚠️ Password minimum 4 characters ka hona chahiye."
        );

        return;

    }


    const confirmPassword =
        prompt(
            "🔐 New Password dobara enter karo:"
        );


    if (confirmPassword === null) return;


    if (
        newPassword !==
        confirmPassword
    ) {

        alert(
            "❌ Password match nahi kar raha."
        );

        return;

    }


    localStorage.setItem(
        "spicyStationAdminPassword",
        newPassword
    );


    alert(
        "✅ Password successfully change ho gaya."
    );

}
// ============================================================
// 🔐 SPICY STATION CUSTOM SECURITY SYSTEM
// ============================================================

let securityAction = null;


// ============================================================
// 🔓 OPEN SECURITY MODAL
// ============================================================

function openSecurityModal(
    title,
    message,
    action
) {

    securityAction = action;


    const modal =
        document.getElementById(
            "security-modal"
        );


    const titleElement =
        document.getElementById(
            "security-title"
        );


    const messageElement =
        document.getElementById(
            "security-message"
        );


    const userInput =
        document.getElementById(
            "security-user-id"
        );


    const passwordInput =
        document.getElementById(
            "security-password"
        );


    if (!modal) return;


    titleElement.textContent =
        title;


    messageElement.textContent =
        message;


    userInput.value = "";

    passwordInput.value = "";


    modal.style.display =
        "flex";


    setTimeout(function() {

        userInput.focus();

    }, 100);

}


// ============================================================
// ❌ CLOSE MODAL
// ============================================================

function closeSecurityModal() {

    const modal =
        document.getElementById(
            "security-modal"
        );


    if (!modal) return;


    modal.style.display =
        "none";


    securityAction = null;

}


// ============================================================
// 👁️ SHOW / HIDE PASSWORD
// ============================================================

function toggleSecurityPassword() {

    const passwordInput =
        document.getElementById(
            "security-password"
        );


    if (!passwordInput) return;


    if (
        passwordInput.type ===
        "password"
    ) {

        passwordInput.type =
            "text";

    }

    else {

        passwordInput.type =
            "password";

    }

}


// ============================================================
// 🔑 SUBMIT SECURITY
// ============================================================

function submitSecurityModal() {

    const userInput =
        document.getElementById(
            "security-user-id"
        );


    const passwordInput =
        document.getElementById(
            "security-password"
        );


    if (
        !userInput ||
        !passwordInput
    ) {

        return;

    }


    const userId =
        userInput.value.trim();


    const password =
        passwordInput.value.trim();


    // ========================================================
    // ⚠️ EMPTY CHECK
    // ========================================================

    if (
        userId.length === 0 ||
        password.length === 0
    ) {

        showSecurityMessage(
            "⚠️ User ID aur Password dono enter karo."
        );

        return;

    }


    // ========================================================
    // 🔐 SAVED LOGIN DETAILS
    // ========================================================

    const savedUserId =
        localStorage.getItem(
            "spicyStationAdminUserId"
        ) || "admin";


    const savedPassword =
        localStorage.getItem(
            "spicyStationAdminPassword"
        ) || "1234";


    // ========================================================
    // 👤 CHECK USER ID
    // ========================================================

    if (
        userId !== savedUserId
    ) {

        showSecurityMessage(
            "❌ User ID galat hai."
        );

        return;

    }


    // ========================================================
    // 🔑 CHECK PASSWORD
    // ========================================================

    if (
        password !== savedPassword
    ) {

        showSecurityMessage(
            "❌ Password galat hai."
        );

        return;

    }


    // ========================================================
    // ✅ LOGIN SUCCESS
    // ========================================================

    const action =
        securityAction;


    closeSecurityModal();


    if (
        typeof action ===
        "function"
    ) {

        action();

    }

}
// ============================================================
// ☁️ SPICY STATION — FIREBASE CLOUD BACKUP SYSTEM
// ============================================================

let cloudAutoBackup = false;
let cloudBackupBusy = false;


// ============================================================
// 🔧 UPDATE CLOUD STATUS
// ============================================================

function updateCloudStatus(
    message,
    type = "normal"
) {

    const status =
        document.getElementById(
            "cloud-sync-status"
        );

    if (!status) return;

    status.textContent =
        message;

    status.dataset.status =
        type;
}


// ============================================================
// 📅 LAST BACKUP DISPLAY
// ============================================================

function updateLastBackupTime(
    time
) {

    const element =
        document.getElementById(
            "last-backup-time"
        );

    if (!element) return;

    element.textContent =
        "📅 Last Backup: " +
        time;

}


// ============================================================
// 🔐 FIREBASE LOGIN MODAL
// ============================================================

function openCloudLoginModal(
    successCallback
) {

    const old =
        document.getElementById(
            "cloud-login-modal"
        );

    if (old) {

        old.remove();

    }


    const modal =
        document.createElement(
            "div"
        );

    modal.id =
        "cloud-login-modal";


    modal.innerHTML = `

        <div class="cloud-login-backdrop"></div>

        <div class="cloud-login-box">

            <div class="cloud-login-icon">
                ☁️
            </div>

            <h2>
                Cloud Backup
            </h2>

            <p>
                Firebase account se login karo.
            </p>


            <div class="cloud-login-input">

                <span>
                    📧
                </span>

                <input
                    type="email"
                    id="cloud-login-email"
                    placeholder="Firebase Email"
                    autocomplete="email"
                >

            </div>


            <div class="cloud-login-input">

                <span>
                    🔑
                </span>

                <input
                    type="password"
                    id="cloud-login-password"
                    placeholder="Firebase Password"
                    autocomplete="current-password"
                >

                <button
                    type="button"
                    id="cloud-login-eye"
                >
                    👁️
                </button>

            </div>


            <p
                id="cloud-login-message"
                class="cloud-login-message"
            ></p>


            <div class="cloud-login-actions">

                <button
                    type="button"
                    id="cloud-login-cancel"
                >
                    Cancel
                </button>

                <button
                    type="button"
                    id="cloud-login-continue"
                >
                    Continue
                </button>

            </div>

        </div>

    `;


    document.body.appendChild(
        modal
    );


    const emailInput =
        document.getElementById(
            "cloud-login-email"
        );


    const passwordInput =
        document.getElementById(
            "cloud-login-password"
        );


    const message =
        document.getElementById(
            "cloud-login-message"
        );


    const cancelButton =
        document.getElementById(
            "cloud-login-cancel"
        );


    const continueButton =
        document.getElementById(
            "cloud-login-continue"
        );


    const eyeButton =
        document.getElementById(
            "cloud-login-eye"
        );


    // ========================================================
    // 👁️ PASSWORD SHOW / HIDE
    // ========================================================

    eyeButton.onclick =
        function() {

            if (
                passwordInput.type ===
                "password"
            ) {

                passwordInput.type =
                    "text";

                eyeButton.textContent =
                    "🙈";

            }

            else {

                passwordInput.type =
                    "password";

                eyeButton.textContent =
                    "👁️";

            }

        };


    // ========================================================
    // ❌ CANCEL
    // ========================================================

    cancelButton.onclick =
        function() {

            modal.remove();

        };


    // ========================================================
    // 🔐 LOGIN
    // ========================================================

    continueButton.onclick =
        async function() {

            const email =
                emailInput.value.trim();


            const password =
                passwordInput.value;


            if (
                !email ||
                !password
            ) {

                message.textContent =
                    "⚠️ Email aur Password dono enter karo.";

                return;

            }


            if (
                typeof window.firebaseAuth ===
                "undefined" ||
                typeof window.firebaseLogin ===
                "undefined"
            ) {

                message.textContent =
                    "❌ Firebase Authentication load nahi hua.";

                return;

            }


            try {

                continueButton.disabled =
                    true;

                continueButton.textContent =
                    "Checking...";


                await window.firebaseLogin(
                    window.firebaseAuth,
                    email,
                    password
                );


                modal.remove();


                updateCloudStatus(
                    "🟢 Cloud account connected",
                    "success"
                );


                if (
                    typeof successCallback ===
                    "function"
                ) {

                    successCallback();

                }

            }

            catch (error) {

                console.error(
                    "Firebase Login Error:",
                    error
                );


                continueButton.disabled =
                    false;

                continueButton.textContent =
                    "Continue";


                message.textContent =
                    "❌ Login failed. Email/Password check karo.";

            }

        };


    setTimeout(
        function() {

            emailInput.focus();

        },
        100
    );

}


// ============================================================
// 🔐 CHECK FIREBASE LOGIN
// ============================================================

function ensureCloudLogin(
    callback
) {

    if (
        typeof window.firebaseAuth ===
        "undefined"
    ) {

        alert(
            "❌ Firebase Authentication available nahi hai."
        );

        return;

    }


    const user =
        window.firebaseAuth.currentUser;


    if (user) {

        callback();

        return;

    }


    openCloudLoginModal(
        callback
    );

}


// ============================================================
// 📦 GET CURRENT BUSINESS DATA
// ============================================================

function getBusinessBackupData() {

    return {

        items:
            typeof items !== "undefined"
                ? items
                : [],

        bills:
            typeof bills !== "undefined"
                ? bills
                : [],

        staffList:
            typeof staffList !== "undefined"
                ? staffList
                : [],

        staffAttendance:
            typeof staffAttendance !== "undefined"
                ? staffAttendance
                : {},

        investments:
            typeof investments !== "undefined"
                ? investments
                : []

    };

}


// ============================================================
// ☁️ BACKUP NOW
// ============================================================

function backupBusinessData() {

    ensureCloudLogin(
        performCloudBackup
    );

}


// ============================================================
// ☁️ PERFORM CLOUD BACKUP
// ============================================================

async function performCloudBackup() {

    if (cloudBackupBusy) {

        return;

    }


    if (
        !window.firebaseDB ||
        !window.firebaseDoc ||
        !window.firebaseSetDoc ||
        !window.firebaseAuth
    ) {

        alert(
            "❌ Firebase Firestore properly load nahi hua."
        );

        return;

    }


    const user =
        window.firebaseAuth.currentUser;


    if (!user) {

        openCloudLoginModal(
            performCloudBackup
        );

        return;

    }


    cloudBackupBusy =
        true;


    updateCloudStatus(
        "⏳ Backup ho raha hai...",
        "loading"
    );


    try {

        const data =
            getBusinessBackupData();


        const backupRef =
            window.firebaseDoc(
                window.firebaseDB,
                "businessBackups",
                user.uid
            );


        await window.firebaseSetDoc(
            backupRef,
            {

                items:
                    data.items,

                bills:
                    data.bills,

                staffList:
                    data.staffList,

                staffAttendance:
                    data.staffAttendance,

                investments:
                    data.investments,

                updatedAt:
                    window.firebaseServerTimestamp()

            }
        );


        const backupTime =
            new Date()
            .toLocaleString(
                "en-IN"
            );


        localStorage.setItem(
            "spicyStationLastCloudBackup",
            backupTime
        );


        updateLastBackupTime(
            backupTime
        );


        updateCloudStatus(
            "🟢 Cloud Backup Successful",
            "success"
        );


        alert(
            "☁️ Backup Successful!\n\n" +
            "Items ✅\n" +
            "Bills ✅\n" +
            "Staff ✅\n" +
            "Attendance ✅\n" +
            "Investments ✅"
        );

    }

    catch (error) {

        console.error(
            "Cloud Backup Error:",
            error
        );


        updateCloudStatus(
            "🔴 Cloud Backup Failed",
            "error"
        );


        alert(
            "❌ Cloud Backup failed.\n\n" +
            "Internet aur Firebase connection check karo."
        );

    }

    finally {

        cloudBackupBusy =
            false;

    }

}


// ============================================================
// 🔄 RESTORE BACKUP
// ============================================================

function restoreBusinessData() {

    ensureCloudLogin(
        performCloudRestore
    );

}


// ============================================================
// 🔄 PERFORM RESTORE
// ============================================================

async function performCloudRestore() {

    if (
        !window.firebaseDB ||
        !window.firebaseDoc ||
        !window.firebaseGetDoc ||
        !window.firebaseAuth
    ) {

        alert(
            "❌ Firebase properly load nahi hua."
        );

        return;

    }


    const user =
        window.firebaseAuth.currentUser;


    if (!user) {

        openCloudLoginModal(
            performCloudRestore
        );

        return;

    }


    const confirmRestore =
        confirm(
            "⚠️ RESTORE BACKUP\n\n" +

            "Cloud ka data current mobile ke data ko replace karega.\n\n" +

            "Items\n" +
            "Bills\n" +
            "Staff\n" +
            "Attendance\n" +
            "Investments\n\n" +

            "Kya aap continue karna chahte ho?"
        );


    if (!confirmRestore) {

        return;

    }


    updateCloudStatus(
        "⏳ Backup restore ho raha hai...",
        "loading"
    );


    try {

        const backupRef =
            window.firebaseDoc(
                window.firebaseDB,
                "businessBackups",
                user.uid
            );


        const snapshot =
            await window.firebaseGetDoc(
                backupRef
            );


        if (
            !snapshot.exists()
        ) {

            updateCloudStatus(
                "🟡 No Cloud Backup Found",
                "warning"
            );


            alert(
                "⚠️ Is Firebase account ke liye koi backup nahi mila."
            );

            return;

        }


        const data =
            snapshot.data();


        // ====================================================
        // 💾 SAVE RESTORED DATA TO LOCAL STORAGE
        // ====================================================

        localStorage.setItem(
            "spicyStationItems",
            JSON.stringify(
                Array.isArray(data.items)
                    ? data.items
                    : []
            )
        );


        localStorage.setItem(
            "spicyStationBills",
            JSON.stringify(
                Array.isArray(data.bills)
                    ? data.bills
                    : []
            )
        );


        localStorage.setItem(
            "spicyStationStaff",
            JSON.stringify(
                Array.isArray(data.staffList)
                    ? data.staffList
                    : []
            )
        );


        localStorage.setItem(
            "spicyStationAttendance",
            JSON.stringify(
                data.staffAttendance || {}
            )
        );


        localStorage.setItem(
            "spicyStationInvestments",
            JSON.stringify(
                Array.isArray(data.investments)
                    ? data.investments
                    : []
            )
        );


        updateCloudStatus(
            "🟢 Restore Successful",
            "success"
        );


        alert(
            "✅ Cloud Backup successfully restore ho gaya.\n\n" +
            "App ab reload hoga."
        );


        location.reload();

    }

    catch (error) {

        console.error(
            "Cloud Restore Error:",
            error
        );


        updateCloudStatus(
            "🔴 Restore Failed",
            "error"
        );


        alert(
            "❌ Restore failed.\n\n" +
            "Internet aur Firebase Rules check karo."
        );

    }

}


// ============================================================
// 🔁 AUTO BACKUP TOGGLE
// ============================================================

function toggleAutoBackup() {

    cloudAutoBackup =
        !cloudAutoBackup;


    const button =
        document.getElementById(
            "auto-backup-button"
        );


    const status =
        document.getElementById(
            "auto-backup-status"
        );


    if (
        cloudAutoBackup
    ) {

        localStorage.setItem(
            "spicyStationAutoBackup",
            "true"
        );


        if (button) {

            button.textContent =
                "ON";

        }


        if (status) {

            status.textContent =
                "Automatic cloud backup ON";

        }


        updateCloudStatus(
            "🟢 Auto Backup ON",
            "success"
        );


        alert(
            "🔁 Auto Backup ON ho gaya.\n\n" +
            "Data save hone ke baad cloud backup ki koshish hogi."
        );

    }

    else {

        localStorage.setItem(
            "spicyStationAutoBackup",
            "false"
        );


        if (button) {

            button.textContent =
                "OFF";

        }


        if (status) {

            status.textContent =
                "Automatic cloud backup OFF";

        }


        updateCloudStatus(
            "🟡 Auto Backup OFF",
            "warning"
        );

    }

}


// ============================================================
// 🔁 LOAD AUTO BACKUP SETTING
// ============================================================

function loadCloudBackupSettings() {

    const saved =
        localStorage.getItem(
            "spicyStationAutoBackup"
        );


    cloudAutoBackup =
        saved === "true";


    const button =
        document.getElementById(
            "auto-backup-button"
        );


    const status =
        document.getElementById(
            "auto-backup-status"
        );


    if (button) {

        button.textContent =
            cloudAutoBackup
                ? "ON"
                : "OFF";

    }


    if (status) {

        status.textContent =
            cloudAutoBackup
                ? "Automatic cloud backup ON"
                : "Automatic cloud backup OFF";

    }


    const lastBackup =
        localStorage.getItem(
            "spicyStationLastCloudBackup"
        );


    if (lastBackup) {

        updateLastBackupTime(
            lastBackup
        );

    }


    if (
        window.firebaseAuth &&
        window.firebaseAuth.currentUser
    ) {

        updateCloudStatus(
            "🟢 Cloud account connected",
            "success"
        );

    }

    else {

        updateCloudStatus(
            "⚪ Cloud account not connected",
            "normal"
        );

    }

}


// ============================================================
// 🔄 AUTO BACKUP AFTER DATA SAVE
// ============================================================

function startAutoCloudBackup() {

    if (
        !cloudAutoBackup
    ) {

        return;

    }


    if (
        !window.firebaseAuth ||
        !window.firebaseAuth.currentUser
    ) {

        return;

    }


    // Small delay so multiple saves
    // don't trigger multiple backups.

    clearTimeout(
        window.spicyStationAutoBackupTimer
    );


    window.spicyStationAutoBackupTimer =
        setTimeout(
            function() {

                performCloudBackup();

            },
            1500
        );

}


// ============================================================
// 🧩 CONNECT AUTO BACKUP WITH saveAllData()
// ============================================================

function connectCloudBackupToSave() {

    if (
        typeof window.saveAllData !==
        "function"
    ) {
        return;
    }


    // Already connected?
    if (
        window.saveAllData &&
        window.saveAllData.__cloudConnected === true
    ) {
        return;
    }


    const originalSaveAllData =
        window.saveAllData;


    function cloudSaveAllData() {

        const result =
            originalSaveAllData.apply(
                this,
                arguments
            );


        // Auto cloud backup
        // ko safely start karo

        setTimeout(
            function() {

                startAutoCloudBackup();

            },
            500
        );


        return result;

    }


    cloudSaveAllData.__cloudConnected =
        true;


    window.saveAllData =
        cloudSaveAllData;

}

// ============================================================
// 🖨️ BLUETOOTH RECEIPT PRINTER
// ============================================================

let receiptPrinterDevice = null;

async function connectReceiptPrinter() {

    // Check Bluetooth support
    if (!navigator.bluetooth) {

        alert(
            "⚠️ Bluetooth support available nahi hai.\n\n" +
            "Please supported Android browser/app mein try karo."
        );

        return;

    }


    try {

        // Open Bluetooth device search
        const device =
            await navigator.bluetooth.requestDevice({

                acceptAllDevices: true,

                optionalServices: []

            });


        receiptPrinterDevice = device;


        // Update status
        setPrinterStatus(true);


        alert(
            "🟢 Printer Selected!\n\n" +
            "Device: " +
            (device.name || "Unknown Printer")
        );


        // Watch for disconnect
        device.addEventListener(
            "gattserverdisconnected",
            function() {

                receiptPrinterDevice = null;

                setPrinterStatus(false);

            }
        );


    } catch (error) {

        console.log(
            "Bluetooth Printer Error:",
            error
        );


        if (
            error.name ===
            "NotFoundError"
        ) {

            alert(
                "⚠️ Koi Bluetooth printer select nahi kiya."
            );

        } else {

            alert(
                "⚠️ Printer connect nahi ho paya.\n\n" +
                error.message
            );

        }

    }

}

function testReceiptPrinter() {

    alert(
        "🧾 Test Print\n\n" +
        "Pehle Bluetooth receipt printer connect karna hoga."
    );

}
// ============================================================
// 🖨️ PRINTER STATUS
// ============================================================

function setPrinterStatus(connected) {

    const status =
        document.getElementById("printer-status");

    if (!status) return;


    if (connected) {

        status.innerHTML =
            "🟢 Printer Connected";

    } else {

        status.innerHTML =
            "🔴 Printer Not Connected";

    }

}
// ============================================================
// 📄 PRINTER PAPER SIZE
// ============================================================

function savePrinterPaperSize() {

    const select =
        document.getElementById(
            "printer-paper-width"
        );

    if (!select) return;

    localStorage.setItem(
        "spicyStationPrinterPaper",
        select.value
    );

}


// ============================================================
// 📄 LOAD PRINTER PAPER SIZE
// ============================================================

function loadPrinterPaperSize() {

    const select =
        document.getElementById(
            "printer-paper-width"
        );

    if (!select) return;


    const savedSize =
        localStorage.getItem(
            "spicyStationPrinterPaper"
        );


    if (savedSize === "58" || savedSize === "80") {

        select.value = savedSize;

    } else {

        select.value = "58";

    }

}
// ============================================================
// 📄 PRINTER PAPER SIZE — SAVE
// ============================================================

function savePrinterPaperSize() {

    const select =
        document.getElementById(
            "printer-paper-width"
        );

    if (!select) return;

    localStorage.setItem(
        "spicyStationPrinterPaper",
        select.value
    );

}


// ============================================================
// 📄 PRINTER PAPER SIZE — LOAD
// ============================================================

function loadPrinterPaperSize() {

    const select =
        document.getElementById(
            "printer-paper-width"
        );

    if (!select) return;


    const savedSize =
        localStorage.getItem(
            "spicyStationPrinterPaper"
        );


    if (
        savedSize === "58" ||
        savedSize === "80"
    ) {

        select.value = savedSize;

    } else {

        select.value = "58";

    }

}
// ============================================================
// 🏪 BUSINESS INFORMATION
// ============================================================

function saveBusinessInformation() {

    const name =
        document.getElementById(
            "business-name"
        )?.value.trim() || "";

    const phone =
        document.getElementById(
            "business-phone"
        )?.value.trim() || "";

    const address =
        document.getElementById(
            "business-address"
        )?.value.trim() || "";


    localStorage.setItem(
        "spicyStationBusinessName",
        name
    );

    localStorage.setItem(
        "spicyStationBusinessPhone",
        phone
    );

    localStorage.setItem(
        "spicyStationBusinessAddress",
        address
    );


    alert(
        "✅ Business details saved successfully."
    );

}


// ============================================================
// 🏪 LOAD BUSINESS INFORMATION
// ============================================================

function loadBusinessInformation() {

    const name =
        localStorage.getItem(
            "spicyStationBusinessName"
        ) || "";

    const phone =
        localStorage.getItem(
            "spicyStationBusinessPhone"
        ) || "";

    const address =
        localStorage.getItem(
            "spicyStationBusinessAddress"
        ) || "";


    const nameInput =
        document.getElementById(
            "business-name"
        );

    const phoneInput =
        document.getElementById(
            "business-phone"
        );

    const addressInput =
        document.getElementById(
            "business-address"
        );


    if (nameInput) {
        nameInput.value = name;
    }


    if (phoneInput) {
        phoneInput.value = phone;
    }


    if (addressInput) {
        addressInput.value = address;
    }

}
// ============================================================
// ✏️ EDIT SAVED BILL SYSTEM
// ============================================================

let billBeingEdited = null;


// 🔐 LOGIN FOR BILL EDIT
function loginForBillEdit() {

    const userId =
        document.getElementById("edit-bill-user-id").value.trim();

    const password =
        document.getElementById("edit-bill-password").value;


    if (!userId || !password) {

        alert("⚠️ User ID aur Password enter karo.");

        return;
    }


    const savedUserId =
        localStorage.getItem("spicyStationAdminUserId");


    const savedPassword =
        localStorage.getItem("spicyStationAdminPassword");


    if (
        userId !== savedUserId ||
        password !== savedPassword
    ) {

        alert("❌ User ID ya Password galat hai.");

        return;
    }


    document.getElementById(
        "edit-bill-login"
    ).style.display = "none";


    document.getElementById(
        "edit-bill-search"
    ).style.display = "block";


    alert("✅ Login successful.");
}


// 🔍 FIND BILL
function findBillForEdit() {

    const billId =
        Number(
            document.getElementById("edit-bill-id").value
        );


    if (!billId) {

        alert("⚠️ Bill ID enter karo.");

        return;
    }


    const bill =
        bills.find(function(item) {

            return Number(item.id) === billId;

        });


    if (!bill) {

        alert("❌ Bill nahi mila.");

        return;
    }


    billBeingEdited =
        JSON.parse(
            JSON.stringify(bill)
        );


    renderBillForEdit();
}


// 📋 SHOW BILL ITEMS
function renderBillForEdit() {

    if (!billBeingEdited) return;


    const container =
        document.getElementById(
            "edit-bill-items"
        );


    let html = "";


    billBeingEdited.items.forEach(
        function(item, index) {

            const price =
                Number(item.price) || 0;

            const qty =
                Number(item.qty) || 0;


            html += `

                <div
                    style="
                        padding:12px;
                        margin:8px 0;
                        border:1px solid #ddd;
                        border-radius:8px;
                    "
                >

                    <strong>
                        ${item.name}
                    </strong>

                    <br>

                    ₹${price.toFixed(2)}
                    × ${qty}

                    <br><br>

                    <button
                        type="button"
                        onclick="cancelEditedBillItem(${index})"
                    >
                        ❌ Cancel Item
                    </button>

                </div>

            `;

        }
    );


    container.innerHTML = html;


    document.getElementById(
        "edit-bill-area"
    ).style.display = "block";


    document.getElementById(
        "edit-bill-old-total"
    ).textContent =
        Number(billBeingEdited.total).toFixed(2);


    updateEditedBillTotal();
}

// ❌ CANCEL ONE QUANTITY / REMOVE ITEM
function cancelEditedBillItem(index) {

    if (!billBeingEdited) return;


    const item =
        billBeingEdited.items[index];


    if (!item) {
        return;
    }


    const qty =
        Number(item.qty) || 0;


    // ➖ Quantity 2, 3, 4... hai
    // to sirf 1 quantity cancel hogi
    if (qty > 1) {

        item.qty =
            qty - 1;

    }

    // ➖ Quantity sirf 1 hai
    // to poora item remove hoga
    else {

        billBeingEdited.items.splice(
            index,
            1
        );

    }


    renderBillForEdit();

}

// 💰 UPDATE NEW TOTAL
function updateEditedBillTotal() {

    if (!billBeingEdited) return;


    let total = 0;


    billBeingEdited.items.forEach(
        function(item) {

            total +=
                (Number(item.price) || 0) *
                (Number(item.qty) || 0);

        }
    );


    billBeingEdited.total =
        total;


    document.getElementById(
        "edit-bill-new-total"
    ).textContent =
        total.toFixed(2);
}// ============================================================
// 💾 SAVE EDITED BILL + EDIT HISTORY
// ============================================================

function saveEditedBill() {

    if (!billBeingEdited) {

        alert("⚠️ Pehle bill search karo.");

        return;
    }


    const reason =
        document
            .getElementById("edit-bill-reason")
            .value
            .trim();


    if (!reason) {

        alert(
            "⚠️ Edit ka reason enter karna zaroori hai."
        );

        return;
    }


    const billIndex =
        bills.findIndex(function(bill) {

            return Number(bill.id) ===
                   Number(billBeingEdited.id);

        });


    if (billIndex === -1) {

        alert("❌ Original bill nahi mila.");

        return;
    }


    const oldBill =
        JSON.parse(
            JSON.stringify(bills[billIndex])
        );


    const newBill =
        JSON.parse(
            JSON.stringify(billBeingEdited)
        );


    // 🔐 Edited by
    const credentials =
        getAdminCredentials();


    // 🕐 Automatic Date & Time
    const editedAt =
        new Date().toLocaleString();


    // 📋 History create
    const editHistory = {

        editedBy:
            credentials.userId,

        reason:
            reason,

        oldTotal:
            Number(oldBill.total) || 0,

        newTotal:
            Number(newBill.total) || 0,

        editedAt:
            editedAt

    };


    // 📋 Existing history ko preserve karo
    if (!Array.isArray(oldBill.editHistory)) {

        oldBill.editHistory = [];

    }


    oldBill.editHistory.push(
        editHistory
    );


    // 🧾 New bill items & total update
    oldBill.items =
        JSON.parse(
            JSON.stringify(newBill.items)
        );


    oldBill.total =
        Number(newBill.total) || 0;


    // 💾 Bill update
    bills[billIndex] =
        oldBill;


    // 💾 LocalStorage / existing save system
    if (typeof saveAllData === "function") {

        saveAllData();

    } else {

        localStorage.setItem(
            "spicyStationBills",
            JSON.stringify(bills)
        );

    }


    alert(
        "✅ Bill successfully updated!\n\n" +

        "Old Total: ₹" +
        oldBill.editHistory[
            oldBill.editHistory.length - 1
        ].oldTotal.toFixed(2) +

        "\nNew Total: ₹" +
        oldBill.editHistory[
            oldBill.editHistory.length - 1
        ].newTotal.toFixed(2) +

        "\n\nReason: " +
        reason +

        "\nEdited by: " +
        credentials.userId +

        "\nDate/Time: " +
        editedAt
    );


    // 🔄 Reset
    billBeingEdited = null;


    document.getElementById(
        "edit-bill-login"
    ).style.display = "block";


    document.getElementById(
        "edit-bill-search"
    ).style.display = "none";


    document.getElementById(
        "edit-bill-area"
    ).style.display = "none";


    document.getElementById(
        "edit-bill-user-id"
    ).value = "";


    document.getElementById(
        "edit-bill-password"
    ).value = "";


    document.getElementById(
        "edit-bill-id"
    ).value = "";


    document.getElementById(
        "edit-bill-reason"
    ).value = "";

}
// ============================================================
// 📋 COPY BILL ID
// ============================================================

function copyBillId(billId) {

    navigator.clipboard.writeText(
        String(billId)
    )
    .then(function() {

        alert(
            "✅ Bill ID copied!\n\n" +
            billId
        );

    })
    .catch(function() {

        alert(
            "⚠️ Bill ID copy nahi ho paya.\n\n" +
            "Bill ID: " +
            billId
        );

    });

}
// ============================================================
// 📊 SALES ANALYTICS
// ============================================================

function showSalesAnalytics() {

    showScreen("sales-analytics-screen");


    const now = new Date();

    // 📅 Aaj
    const today = new Date(
        now.getFullYear(),
        now.getMonth(),
        now.getDate()
    );

    // 📅 Kal
    const yesterday = new Date(today);

    yesterday.setDate(
        yesterday.getDate() - 1
    );


    let todaySales = 0;
    let yesterdaySales = 0;

    let cashSales = 0;
    let upiSales = 0;


    bills.forEach(function(bill) {

        const billDate =
            new Date(bill.id);

        const billDay =
            new Date(
                billDate.getFullYear(),
                billDate.getMonth(),
                billDate.getDate()
            );

        const total =
            Number(bill.total) || 0;


        // 💰 Aaj ki sales
        if (
            billDay.getTime() ===
            today.getTime()
        ) {

            todaySales += total;


            if (bill.payment === "UPI") {

                upiSales += total;

            } else {

                cashSales += total;

            }

        }


        // 📅 Kal ki sales
        if (
            billDay.getTime() ===
            yesterday.getTime()
        ) {

            yesterdaySales += total;

        }

    });


    // 📊 Growth percentage
    let percentage = 0;

    if (yesterdaySales > 0) {

        percentage =
            (
                (todaySales - yesterdaySales) /
                yesterdaySales
            ) * 100;

    }


    // 📈 Growth status
    let growthText = "";


    if (todaySales > yesterdaySales) {

        growthText =
            "📈 Growing Up +" +
            percentage.toFixed(2) +
            "%";

    }

    else if (todaySales < yesterdaySales) {

        growthText =
            "📉 Growing Down " +
            percentage.toFixed(2) +
            "%";

    }

    else {

        growthText =
            "➡️ Stable 0.00%";

    }


    // 📊 DATA SCREEN PAR SHOW KARO

    document.getElementById(
        "analytics-today-sales"
    ).textContent =
        "₹" + todaySales.toFixed(2);


    document.getElementById(
        "analytics-yesterday-sales"
    ).textContent =
        "₹" + yesterdaySales.toFixed(2);


    document.getElementById(
        "analytics-growth"
    ).textContent =
        growthText;


    document.getElementById(
        "analytics-cash"
    ).textContent =
        "₹" + cashSales.toFixed(2);


    document.getElementById(
        "analytics-upi"
    ).textContent =
        "₹" + upiSales.toFixed(2);

}