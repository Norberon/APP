// Variables globales
let products = [];
let sales = [];
let expenses = [];
let currentDate = new Date().toISOString().split('T')[0];

// Structure initiale des données des produits
const initialProducts = [
    { id: 1, name: 'photocopie 25f', category: 'Photocopies', price: 25 },
    { id: 2, name: 'photocopie 15f', category: 'Photocopies', price: 15 },
    { id: 3, name: 'impression 100f', category: 'Impressions', price: 100 },
    { id: 4, name: 'impression 50f', category: 'Impressions', price: 50 },
    { id: 5, name: 'impression 25f', category: 'Impressions', price: 25 },
    { id: 6, name: 'SIM MOOV', category: 'SIM', price: 1000 },
    { id: 7, name: 'SIM Tgcom 1000', category: 'SIM', price: 1000 },
    { id: 8, name: 'Sim tgcom 800', category: 'SIM', price: 800 },
    { id: 9, name: 'SCANNER', category: 'Services', price: 100 },
    { id: 10, name: 'Saisie + Imp', category: 'Services', price: 300 },
    { id: 11, name: 'Saisie 250', category: 'Services', price: 250 },
    { id: 12, name: 'Saisie 200', category: 'Services', price: 200 },
    { id: 13, name: 'WIFI 100', category: 'WIFI', price: 100 },
    { id: 14, name: 'WIFI 150', category: 'WIFI', price: 150 },
    { id: 15, name: 'WIFI 200', category: 'WIFI', price: 200 },
    { id: 16, name: 'WIFI 500', category: 'WIFI', price: 500 },
    { id: 17, name: 'WIFI 2000', category: 'WIFI', price: 2000 },
    { id: 18, name: 'CHEMISE', category: 'Autres', price: 100 },
    { id: 19, name: 'Enveloppe 100', category: 'Autres', price: 100 },
    { id: 20, name: 'Enveloppe 50', category: 'Autres', price: 50 },
    { id: 21, name: 'Enveloppe 25', category: 'Autres', price: 25 },
    { id: 22, name: 'ECOUTEUR', category: 'Autres', price: 700 }
];

// Données d'exemple pour la démo
const sampleSales = [
    { id: 1, date: '2025-05-01', productId: 1, quantity: 10, price: 25, total: 250 },
    { id: 2, date: '2025-05-01', productId: 3, quantity: 5, price: 100, total: 500 },
    { id: 3, date: '2025-05-02', productId: 13, quantity: 8, price: 100, total: 800 },
    { id: 4, date: '2025-05-02', productId: 17, quantity: 2, price: 2000, total: 4000 },
    { id: 5, date: '2025-05-03', productId: 6, quantity: 3, price: 1000, total: 3000 },
    { id: 6, date: '2025-05-04', productId: 9, quantity: 4, price: 100, total: 400 },
    { id: 7, date: '2025-05-05', productId: 4, quantity: 20, price: 50, total: 1000 },
    { id: 8, date: '2025-05-06', productId: 2, quantity: 30, price: 15, total: 450 },
    { id: 9, date: '2025-05-07', productId: 15, quantity: 5, price: 200, total: 1000 },
    { id: 10, date: '2025-05-08', productId: 22, quantity: 2, price: 700, total: 1400 }
];

const sampleExpenses = [
    { id: 1, date: '2025-05-01', description: 'Achat papier', amount: 5000 },
    { id: 2, date: '2025-05-03', description: 'Recharge internet', amount: 10000 },
    { id: 3, date: '2025-05-05', description: 'Matériel', amount: 8000 },
    { id: 4, date: '2025-05-07', description: 'Cartes SIM', amount: 15000 },
    { id: 5, date: '2025-05-10', description: 'Fournitures', amount: 6500 },
    { id: 6, date: '2025-05-15', description: 'Électricité', amount: 10000 }
];

// Initialisation de l'application
document.addEventListener('DOMContentLoaded', function() {
    // Charger les données depuis le localStorage ou utiliser les données d'initialisation
    initializeData();

    // Définir la navigation
    setupNavigation();

    // Définir les écouteurs d'événements pour les formulaires
    setupFormListeners();

    // Remplir les tableaux
    populateProductsTable();
    updateDailySalesTable();
    
    // Initialiser le tableau de bord
    updateDashboard();
});

// Initialisation des données
function initializeData() {
    const storedProducts = localStorage.getItem('products');
    const storedSales = localStorage.getItem('sales');
    const storedExpenses = localStorage.getItem('expenses');
    
    // Si des données sont stockées, les utiliser, sinon utiliser les données d'exemple
    products = storedProducts ? JSON.parse(storedProducts) : initialProducts;
    sales = storedSales ? JSON.parse(storedSales) : sampleSales;
    expenses = storedExpenses ? JSON.parse(storedExpenses) : sampleExpenses;
    
    // Définir la date actuelle pour les formulaires
    document.getElementById('sale-date').value = currentDate;
    
    // Si report-month existe, définir sur le mois en cours
    const reportMonth = document.getElementById('report-month');
    if (reportMonth) {
        const today = new Date();
        const month = today.getMonth() + 1;
        const year = today.getFullYear();
        reportMonth.value = `${year}-${month.toString().padStart(2, '0')}`;
    }
    
    // Sauvegarder les données dans localStorage
    saveDataToLocalStorage();
}

// Configuration de la navigation
function setupNavigation() {
    const sections = ['dashboard', 'sales-entry', 'products', 'reports'];
    
    sections.forEach(section => {
        const link = document.getElementById(`${section}-link`);
        if (link) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                showSection(section);
            });
        }
    });
}

// Afficher la section sélectionnée et masquer les autres
function showSection(sectionId) {
    const sections = document.querySelectorAll('.section-content');
    const links = document.querySelectorAll('.nav-link');
    
    sections.forEach(section => {
        section.classList.add('d-none');
    });
    
    links.forEach(link => {
        link.classList.remove('active');
    });
    
    document.getElementById(`${sectionId}-section`).classList.remove('d-none');
    document.getElementById(`${sectionId}-link`).classList.add('active');
    
    // Actions spécifiques à certaines sections
    if (sectionId === 'dashboard') {
        updateDashboard();
    } else if (sectionId === 'sales-entry') {
        updateDailySalesTable();
    } else if (sectionId === 'reports') {
        generateMonthlyReport();
    }
}

// Configuration des écouteurs d'événements pour les formulaires
function setupFormListeners() {
    // Formulaire de saisie des ventes
    const salesForm = document.getElementById('sales-form');
    if (salesForm) {
        salesForm.addEventListener('submit', function(e) {
            e.preventDefault();
            addSale();
        });
    }
    
    // Formulaire de produits
    const productForm = document.getElementById('product-form');
    if (productForm) {
        productForm.addEventListener('submit', function(e) {
            e.preventDefault();
            saveProduct();
        });
    }
    
    // Bouton pour effacer le formulaire de produit
    const clearProductFormBtn = document.getElementById('clear-product-form');
    if (clearProductFormBtn) {
        clearProductFormBtn.addEventListener('click', function() {
            clearProductForm();
        });
    }
    
    // Formulaire de rapport
    const reportForm = document.getElementById('report-form');
    if (reportForm) {
        reportForm.addEventListener('submit', function(e) {
            e.preventDefault();
            generateReport();
        });
    }
    
    // Bouton d'exportation de rapport
    const exportReportBtn = document.getElementById('export-report');
    if (exportReportBtn) {
        exportReportBtn.addEventListener('click', function() {
            exportReport();
        });
    }
    
    // Bouton d'impression de rapport
    const printReportBtn = document.getElementById('print-report');
    if (printReportBtn) {
        printReportBtn.addEventListener('click', function() {
            printReport();
        });
    }
    
    // Chargement automatique du prix lorsqu'un produit est sélectionné
    const productSelect = document.getElementById('product-select');
    if (productSelect) {
        productSelect.addEventListener('change', function() {
            const selectedProduct = products.find(p => p.name === this.value);
            if (selectedProduct) {
                document.getElementById('price').value = selectedProduct.price;
            }
        });
    }
}

// Ajouter une nouvelle vente
function addSale() {
    const date = document.getElementById('sale-date').value;
    const productName = document.getElementById('product-select').value;
    const quantity = parseInt(document.getElementById('quantity').value);
    const price = parseFloat(document.getElementById('price').value);
    const total = quantity * price;
    
    const product = products.find(p => p.name === productName);
    if (!product) {
        alert('Veuillez sélectionner un produit valide.');
        return;
    }
    
    const newSale = {
        id: sales.length > 0 ? Math.max(...sales.map(s => s.id)) + 1 : 1,
        date: date,
        productId: product.id,
        quantity: quantity,
        price: price,
        total: total
    };
    
    sales.push(newSale);
    saveDataToLocalStorage();
    updateDailySalesTable();
    updateDashboard();
    
    // Réinitialiser le formulaire
    document.getElementById('sales-form').reset();
    document.getElementById('sale-date').value = currentDate;
}

// Supprimer une vente
function deleteSale(id) {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette vente ?')) {
        sales = sales.filter(sale => sale.id !== id);
        saveDataToLocalStorage();
        updateDailySalesTable();
        updateDashboard();
    }
}

// Mettre à jour le tableau des ventes quotidiennes
function updateDailySalesTable() {
    const tableBody = document.getElementById('daily-sales-body');
    const salesTotal = document.getElementById('daily-sales-total');
    
    if (!tableBody || !salesTotal) return;
    
    tableBody.innerHTML = '';
    
    // Filtrer les ventes du jour
    const dailySales = sales.filter(sale => sale.date === currentDate);
    let dailyTotal = 0;
    
    dailySales.forEach(sale => {
        const product = products.find(p => p.id === sale.productId);
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${product ? product.name : 'Produit inconnu'}</td>
            <td>${sale.quantity}</td>
            <td>${sale.price}</td>
            <td>${sale.total}</td>
            <td>
                <button class="btn btn-sm btn-danger" onclick="deleteSale(${sale.id})">
                    <i class="bi bi-trash"></i>
                </button>
            </td>
        `;
        
        tableBody.appendChild(row);
        dailyTotal += sale.total;
    });
    
    salesTotal.textContent = dailyTotal;
}

// Enregistrer un produit
function saveProduct() {
    const productId = document.getElementById('product-id').value;
    const name = document.getElementById('product-name').value;
    const category = document.getElementById('product-category').value;
    const price = parseFloat(document.getElementById('product-price').value);
    
    if (productId) {
        // Modification d'un produit existant
        const index = products.findIndex(p => p.id === parseInt(productId));
        if (index !== -1) {
            products[index] = {
                ...products[index],
                name: name,
                category: category,
                price: price
            };
        }
    } else {
        // Ajout d'un nouveau produit
        const newProduct = {
            id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
            name: name,
            category: category,
            price: price
        };
        
        products.push(newProduct);
    }
    
    saveDataToLocalStorage();
    populateProductsTable();
    clearProductForm();
    
    // Mettre à jour le menu déroulant des produits
    updateProductSelect();
}

// Editer un produit
function editProduct(id) {
    const product = products.find(p => p.id === id);
    if (product) {
        document.getElementById('product-id').value = product.id;
        document.getElementById('product-name').value = product.name;
        document.getElementById('product-category').value = product.category;
        document.getElementById('product-price').value = product.price;
    }
}

// Supprimer un produit
function deleteProduct(id) {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce produit ?')) {
        products = products.filter(product => product.id !== id);
        saveDataToLocalStorage();
        populateProductsTable();
        updateProductSelect();
    }
}

// Effacer le formulaire de produit
function clearProductForm() {
    document.getElementById('product-id').value = '';
    document.getElementById('product-name').value = '';
    document.getElementById('product-category').value = '';
    document.getElementById('product-price').value = '';
}

// Remplir le tableau des produits
function populateProductsTable() {
    const tableBody = document.getElementById('products-body');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    products.forEach(product => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td>${product.price}</td>
            <td>
                <button class="btn btn-sm btn-primary me-1" onclick="editProduct(${product.id})">
                    <i class="bi bi-pencil"></i>
                </button>
                <button class="btn btn-sm btn-danger" onclick="deleteProduct(${product.id})">
                    <i class="bi bi-trash"></i>
                </button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

// Mettre à jour le menu déroulant des produits
function updateProductSelect() {
    const productSelect = document.getElementById('product-select');
    if (!productSelect) return;
    
    // Sauvegarder la sélection actuelle
    const currentSelection = productSelect.value;
    
    // Vider le menu sauf la première option
    while (productSelect.options.length > 1) {
        productSelect.remove(1);
    }
    
    // Regrouper les produits par catégorie
    const productsByCategory = {};
    products.forEach(product => {
        if (!productsByCategory[product.category]) {
            productsByCategory[product.category] = [];
        }
        productsByCategory[product.category].push(product);
    });
    
    // Ajouter les produits par groupe
    for (const category in productsByCategory) {
        const group = document.createElement('optgroup');
        group.label = category;
        
        productsByCategory[category].forEach(product => {
            const option = document.createElement('option');
            option.value = product.name;
            option.textContent = product.name;
            group.appendChild(option);
        });
        
        productSelect.appendChild(group);
    }
    
    // Restaurer la sélection si possible
    if (currentSelection) {
        productSelect.value = currentSelection;
    }
}

// Générer un rapport
function generateReport() {
    const reportType = document.getElementById('report-type').value;
    
    switch (reportType) {
        case 'daily':
            generateDailyReport();
            break;
        case 'monthly':
            generateMonthlyReport();
            break;
        case 'category':
            generateCategoryReport();
            break;
    }
}

// Générer un rapport mensuel
function generateMonthlyReport() {
    const monthInput = document.getElementById('report-month').value;
    if (!monthInput) {
        alert('Veuillez sélectionner un mois.');
        return;
    }
    
    const [year, month] = monthInput.split('-');
    const reportTitle = document.getElementById('report-title');
    reportTitle.textContent = `Rapport Mensuel - ${getMonthName(parseInt(month))} ${year}`;
    
    // Filtrer les ventes pour le mois sélectionné
    const monthSales = sales.filter(sale => {
        const saleDate = new Date(sale.date);
        return saleDate.getFullYear() === parseInt(year) && saleDate.getMonth() + 1 === parseInt(month);
    });
    
    // Filtrer les dépenses pour le mois sélectionné
    const monthExpenses = expenses.filter(expense => {
        const expenseDate = new Date(expense.date);
        return expenseDate.getFullYear() === parseInt(year) && expenseDate.getMonth() + 1 === parseInt(month);
    });
    
    // Préparer le tableau
    const tableHead = document.getElementById('report-table-head');
    const tableBody = document.getElementById('report-table-body');
    const tableFoot = document.getElementById('report-table-foot');
    
    tableHead.innerHTML = `
        <tr>
            <th>Date</th>
            <th>Produit</th>
            <th>Catégorie</th>
            <th>Quantité</th>
            <th>Prix unitaire</th>
            <th>Total</th>
        </tr>
    `;
    
    tableBody.innerHTML = '';
    
    // Organiser les ventes par date
    const salesByDate = {};
    monthSales.forEach(sale => {
        if (!salesByDate[sale.date]) {
            salesByDate[sale.date] = [];
        }
        salesByDate[sale.date].push(sale);
    });
    
    // Ajouter les ventes au tableau
    for (const date in salesByDate) {
        const formattedDate = formatDate(date);
        let isFirstRow = true;
        
        salesByDate[date].forEach(sale => {
            const product = products.find(p => p.id === sale.productId);
            const row = document.createElement('tr');
            
            row.innerHTML = `
                <td>${isFirstRow ? formattedDate : ''}</td>
                <td>${product ? product.name : 'Produit inconnu'}</td>
                <td>${product ? product.category : '-'}</td>
                <td>${sale.quantity}</td>
                <td>${sale.price}</td>
                <td>${sale.total}</td>
            `;
            
            tableBody.appendChild(row);
            isFirstRow = false;
        });
    }
    
    // Calculer les totaux
    const totalSales = monthSales.reduce((sum, sale) => sum + sale.total, 0);
    const totalWifiSales = monthSales
        .filter(sale => {
            const product = products.find(p => p.id === sale.productId);
            return product && product.category === 'WIFI';
        })
        .reduce((sum, sale) => sum + sale.total, 0);
    
    const totalArticleSales = totalSales - totalWifiSales;
    const totalExpenses = monthExpenses.reduce((sum, expense) => sum + expense.amount, 0);
    const netRevenue = totalSales - totalExpenses;
    
    tableFoot.innerHTML = `
        <tr>
            <th colspan="5">Total</th>
            <th>${totalSales}</th>
        </tr>
    `;
    
    // Mettre à jour le résumé
    document.getElementById('report-sum-articles').textContent = totalArticleSales;
    document.getElementById('report-sum-wifi').textContent = totalWifiSales;
    document.getElementById('report-gross-revenue').textContent = totalSales;
    document.getElementById('report-sum-expenses').textContent = totalExpenses;
    document.getElementById('report-net-revenue').textContent = netRevenue;
    
    // Créer un graphique
    createReportChart(monthSales);
}

// Générer un rapport quotidien
function generateDailyReport() {
    // Implémentation simple pour l'exemple
    alert('Fonctionnalité en cours de développement.');
}

// Générer un rapport par catégorie
function generateCategoryReport() {
    // Implémentation simple pour l'exemple
    alert('Fonctionnalité en cours de développement.');
}

// Créer un graphique pour le rapport
function createReportChart(filteredSales) {
    // Organiser les ventes par catégorie
    const salesByCategory = {};
    
    filteredSales.forEach(sale => {
        const product = products.find(p => p.id === sale.productId);
        if (product) {
            if (!salesByCategory[product.category]) {
                salesByCategory[product.category] = 0;
            }
            salesByCategory[product.category] += sale.total;
        }
    });
    
    // Préparer les données pour le graphique
    const categories = Object.keys(salesByCategory);
    const values = Object.values(salesByCategory);
    
    // Définir les couleurs
    const colors = [
        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
        '#FF9F40', '#C9CBCF', '#7FC8F8', '#FFD8D8', '#A5D8A0'
    ];
    
    // Créer le graphique
    const ctx = document.getElementById('report-chart').getContext('2d');
    
    // Détruire le graphique existant s'il y en a un
    if (window.reportChart) {
        window.reportChart.destroy();
    }
    
    window.reportChart = new Chart(ctx, {
        type: 'pie',
        data: {
            labels: categories,
            datasets: [{
                data: values,
                backgroundColor: colors.slice(0, categories.length),
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'right',
                }
            }
        }
    });
}

// Exporter le rapport en format Excel/CSV
function exportReport() {
    // Implémentation simple pour l'exemple
    alert('Fonctionnalité d\'exportation en cours de développement.');
}

// Imprimer le rapport
function printReport() {
    window.print();
}

// Mettre à jour le tableau de bord
function updateDashboard() {
    // Calculer les totaux
    const totalSales = sales.reduce((sum, sale) => sum + sale.total, 0);
    const totalWifiSales = sales
        .filter(sale => {
            const product = products.find(p => p.id === sale.productId);
            return product && product.category === 'WIFI';
        })
        .reduce((sum, sale) => sum + sale.total, 0);
    
    const totalArticleSales = totalSales - totalWifiSales;
    const totalExpenses = expenses.reduce((sum, expense) => sum + expense.amount, 0);
    const netRevenue = totalSales - totalExpenses;
    
    // Mettre à jour les cartes du tableau de bord
    document.getElementById('total-revenue').textContent = totalSales;
    document.getElementById('final-revenue').textContent = netRevenue;
    document.getElementById('total-articles').textContent = totalArticleSales;
    document.getElementById('total-expenses').textContent = totalExpenses;
    
    // Créer les graphiques
    createCategoryChart();
    createDailySalesChart();
}

// Créer un graphique des ventes par catégorie
function createCategoryChart() {
    // Organiser les ventes par catégorie
    const salesByCategory = {};
    
    sales.forEach(sale => {
        const product = products.find(p => p.id === sale.productId);
        if (product) {
            if (!salesByCategory[product.category]) {
                salesByCategory[product.category] = 0;
            }
            salesByCategory[product.category] += sale.total;
        }
    });
    
    // Préparer les données pour le graphique
    const categories = Object.keys(salesByCategory);
    const values = Object.values(salesByCategory);
    
    // Définir les couleurs
    const colors = [
        '#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF',
        '#FF9F40', '#C9CBCF', '#7FC8F8', '#FFD8D8', '#A5D8A0'
    ];
    
    // Créer le graphique
    const ctx = document.getElementById('salesByCategory').getContext('2d');
    
    // Détruire le graphique existant s'il y en a un
    if (window.categoryChart) {
        window.categoryChart.destroy();
    }
    
    window.categoryChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: categories,
            datasets: [{
                data: values,
                backgroundColor: colors.slice(0, categories.length),
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'right',
                }
            }
        }
    });
}

// Créer un graphique des ventes quotidiennes
function createDailySalesChart() {
    // Organiser les ventes par date
    const salesByDate = {};
    
    // Obtenir la date actuelle
    const today = new Date();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();
    
    // Créer un objet avec tous les jours du mois
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    for (let i = 1; i <= daysInMonth; i++) {
        const date = new Date(currentYear, currentMonth, i);
        const dateStr = date.toISOString().split('T')[0];
        salesByDate[dateStr] = 0;
    }
    
    // Ajouter les ventes
    sales.forEach(sale => {
        const saleDate = new Date(sale.date);
        if (saleDate.getMonth() === currentMonth && saleDate.getFullYear() === currentYear) {
            salesByDate[sale.date] += sale.total;
        }
    });
    
    // Préparer les données pour le graphique
    const dates = Object.keys(salesByDate).sort();
    const values = dates.map(date => salesByDate[date]);
    
    // Créer le graphique
    const ctx = document.getElementById('salesByDay').getContext('2d');
    
    // Détruire le graphique existant s'il y en a un
    if (window.dailyChart) {
        window.dailyChart.destroy();
    }
    
    window.dailyChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates.map(date => date.split('-')[2]), // Juste le jour
            datasets: [{
                label: 'Ventes quotidiennes',
                data: values,
                backgroundColor: 'rgba(54, 162, 235, 0.2)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 2,
                tension: 0.1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

// Fonctions utilitaires

// Sauvegarder les données dans localStorage
function saveDataToLocalStorage() {
    localStorage.setItem('products', JSON.stringify(products));
    localStorage.setItem('sales', JSON.stringify(sales));
    localStorage.setItem('expenses', JSON.stringify(expenses));
}

// Obtenir le nom du mois
function getMonthName(monthNumber) {
    const months = [
        'Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin',
        'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'
    ];
    return months[monthNumber - 1];
}

// Formater une date
function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR');
}