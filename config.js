// Konfigurasi Turnamen Miku Store
const tournamentConfig = {
    // Waktu berakhir registrasi turnamen (Format: YYYY-MM-DDTHH:MM:SS)
    endTime: "2090-04-18T20:00:00",
    
    // Informasi Turnamen
    tournamentInfo: {
        name: "t",
        entryFee: 10000,
        maxSlot: 32,
        startTime: "19:00 WIB",
        schedule: "Harian"
    },
    
    // Hadiah Turnamen
    prizes: {
        winner1: 150000,
        winner2: 75000,
        winner3: 35000
    },
    
    // Kontak Admin
    contact: {
        whatsapp: "6281234567890",
        discord: "mikustore",
        email: "admin@mikustore.com"
    },
    
    // Metode Pembayaran
    paymentMethods: {
        dana: "081234567890",
        qris: true
    }
};

// Export untuk penggunaan
if (typeof module !== 'undefined' && module.exports) {
    module.exports = tournamentConfig;
}
