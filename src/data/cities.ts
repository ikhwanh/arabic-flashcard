export interface City {
  name: string
  province: string
  lat: number
  lng: number
  tz: 'Asia/Jakarta' | 'Asia/Makassar' | 'Asia/Jayapura'
}

const WIB = 'Asia/Jakarta'
const WITA = 'Asia/Makassar'
const WIT = 'Asia/Jayapura'

export const CITIES: City[] = [
  // Sumatra
  { name: 'Banda Aceh', province: 'Aceh', lat: 5.548, lng: 95.324, tz: WIB },
  { name: 'Lhokseumawe', province: 'Aceh', lat: 5.18, lng: 97.15, tz: WIB },
  { name: 'Medan', province: 'Sumatera Utara', lat: 3.595, lng: 98.672, tz: WIB },
  { name: 'Binjai', province: 'Sumatera Utara', lat: 3.6, lng: 98.485, tz: WIB },
  { name: 'Pematangsiantar', province: 'Sumatera Utara', lat: 2.96, lng: 99.068, tz: WIB },
  { name: 'Padang', province: 'Sumatera Barat', lat: -0.947, lng: 100.417, tz: WIB },
  { name: 'Bukittinggi', province: 'Sumatera Barat', lat: -0.305, lng: 100.369, tz: WIB },
  { name: 'Pekanbaru', province: 'Riau', lat: 0.507, lng: 101.448, tz: WIB },
  { name: 'Dumai', province: 'Riau', lat: 1.665, lng: 101.447, tz: WIB },
  { name: 'Tanjung Pinang', province: 'Kepulauan Riau', lat: 0.918, lng: 104.466, tz: WIB },
  { name: 'Batam', province: 'Kepulauan Riau', lat: 1.045, lng: 104.031, tz: WIB },
  { name: 'Jambi', province: 'Jambi', lat: -1.61, lng: 103.613, tz: WIB },
  { name: 'Palembang', province: 'Sumatera Selatan', lat: -2.976, lng: 104.775, tz: WIB },
  { name: 'Lubuklinggau', province: 'Sumatera Selatan', lat: -3.296, lng: 102.861, tz: WIB },
  { name: 'Pangkal Pinang', province: 'Kepulauan Bangka Belitung', lat: -2.129, lng: 106.11, tz: WIB },
  { name: 'Bengkulu', province: 'Bengkulu', lat: -3.8, lng: 102.266, tz: WIB },
  { name: 'Bandar Lampung', province: 'Lampung', lat: -5.397, lng: 105.266, tz: WIB },
  { name: 'Metro', province: 'Lampung', lat: -5.113, lng: 105.307, tz: WIB },

  // Java
  { name: 'Jakarta', province: 'DKI Jakarta', lat: -6.2, lng: 106.817, tz: WIB },
  { name: 'Serang', province: 'Banten', lat: -6.12, lng: 106.15, tz: WIB },
  { name: 'Cilegon', province: 'Banten', lat: -6.002, lng: 106.011, tz: WIB },
  { name: 'Tangerang', province: 'Banten', lat: -6.178, lng: 106.63, tz: WIB },
  { name: 'Tangerang Selatan', province: 'Banten', lat: -6.288, lng: 106.718, tz: WIB },
  { name: 'Bandung', province: 'Jawa Barat', lat: -6.917, lng: 107.619, tz: WIB },
  { name: 'Bogor', province: 'Jawa Barat', lat: -6.595, lng: 106.817, tz: WIB },
  { name: 'Depok', province: 'Jawa Barat', lat: -6.402, lng: 106.794, tz: WIB },
  { name: 'Bekasi', province: 'Jawa Barat', lat: -6.238, lng: 106.976, tz: WIB },
  { name: 'Karawang', province: 'Jawa Barat', lat: -6.305, lng: 107.3, tz: WIB },
  { name: 'Sukabumi', province: 'Jawa Barat', lat: -6.918, lng: 106.927, tz: WIB },
  { name: 'Garut', province: 'Jawa Barat', lat: -7.214, lng: 107.9, tz: WIB },
  { name: 'Tasikmalaya', province: 'Jawa Barat', lat: -7.327, lng: 108.22, tz: WIB },
  { name: 'Cirebon', province: 'Jawa Barat', lat: -6.706, lng: 108.557, tz: WIB },
  { name: 'Semarang', province: 'Jawa Tengah', lat: -6.967, lng: 110.417, tz: WIB },
  { name: 'Surakarta (Solo)', province: 'Jawa Tengah', lat: -7.566, lng: 110.817, tz: WIB },
  { name: 'Salatiga', province: 'Jawa Tengah', lat: -7.331, lng: 110.492, tz: WIB },
  { name: 'Magelang', province: 'Jawa Tengah', lat: -7.47, lng: 110.218, tz: WIB },
  { name: 'Purwokerto', province: 'Jawa Tengah', lat: -7.424, lng: 109.23, tz: WIB },
  { name: 'Tegal', province: 'Jawa Tengah', lat: -6.869, lng: 109.14, tz: WIB },
  { name: 'Pekalongan', province: 'Jawa Tengah', lat: -6.889, lng: 109.675, tz: WIB },
  { name: 'Kudus', province: 'Jawa Tengah', lat: -6.807, lng: 110.84, tz: WIB },
  { name: 'Yogyakarta', province: 'DI Yogyakarta', lat: -7.797, lng: 110.37, tz: WIB },
  { name: 'Surabaya', province: 'Jawa Timur', lat: -7.25, lng: 112.751, tz: WIB },
  { name: 'Sidoarjo', province: 'Jawa Timur', lat: -7.447, lng: 112.718, tz: WIB },
  { name: 'Gresik', province: 'Jawa Timur', lat: -7.155, lng: 112.656, tz: WIB },
  { name: 'Mojokerto', province: 'Jawa Timur', lat: -7.472, lng: 112.434, tz: WIB },
  { name: 'Malang', province: 'Jawa Timur', lat: -7.983, lng: 112.621, tz: WIB },
  { name: 'Pasuruan', province: 'Jawa Timur', lat: -7.645, lng: 112.907, tz: WIB },
  { name: 'Probolinggo', province: 'Jawa Timur', lat: -7.754, lng: 113.216, tz: WIB },
  { name: 'Jember', province: 'Jawa Timur', lat: -8.172, lng: 113.7, tz: WIB },
  { name: 'Banyuwangi', province: 'Jawa Timur', lat: -8.219, lng: 114.369, tz: WIB },
  { name: 'Kediri', province: 'Jawa Timur', lat: -7.817, lng: 112.012, tz: WIB },
  { name: 'Blitar', province: 'Jawa Timur', lat: -8.098, lng: 112.168, tz: WIB },
  { name: 'Madiun', province: 'Jawa Timur', lat: -7.63, lng: 111.523, tz: WIB },
  { name: 'Pamekasan', province: 'Jawa Timur', lat: -7.157, lng: 113.474, tz: WIB },

  // Bali and Nusa Tenggara
  { name: 'Denpasar', province: 'Bali', lat: -8.65, lng: 115.217, tz: WITA },
  { name: 'Mataram', province: 'Nusa Tenggara Barat', lat: -8.583, lng: 116.117, tz: WITA },
  { name: 'Bima', province: 'Nusa Tenggara Barat', lat: -8.46, lng: 118.727, tz: WITA },
  { name: 'Kupang', province: 'Nusa Tenggara Timur', lat: -10.178, lng: 123.607, tz: WITA },

  // Kalimantan
  { name: 'Pontianak', province: 'Kalimantan Barat', lat: -0.026, lng: 109.342, tz: WIB },
  { name: 'Singkawang', province: 'Kalimantan Barat', lat: 0.909, lng: 108.985, tz: WIB },
  { name: 'Palangka Raya', province: 'Kalimantan Tengah', lat: -2.208, lng: 113.917, tz: WIB },
  { name: 'Banjarmasin', province: 'Kalimantan Selatan', lat: -3.317, lng: 114.59, tz: WITA },
  { name: 'Samarinda', province: 'Kalimantan Timur', lat: -0.502, lng: 117.154, tz: WITA },
  { name: 'Balikpapan', province: 'Kalimantan Timur', lat: -1.265, lng: 116.831, tz: WITA },
  { name: 'Bontang', province: 'Kalimantan Timur', lat: 0.133, lng: 117.5, tz: WITA },
  { name: 'Tanjung Selor', province: 'Kalimantan Utara', lat: 2.837, lng: 117.367, tz: WITA },
  { name: 'Tarakan', province: 'Kalimantan Utara', lat: 3.3, lng: 117.633, tz: WITA },

  // Sulawesi
  { name: 'Manado', province: 'Sulawesi Utara', lat: 1.474, lng: 124.842, tz: WITA },
  { name: 'Bitung', province: 'Sulawesi Utara', lat: 1.441, lng: 125.128, tz: WITA },
  { name: 'Gorontalo', province: 'Gorontalo', lat: 0.543, lng: 123.057, tz: WITA },
  { name: 'Palu', province: 'Sulawesi Tengah', lat: -0.899, lng: 119.87, tz: WITA },
  { name: 'Mamuju', province: 'Sulawesi Barat', lat: -2.677, lng: 118.886, tz: WITA },
  { name: 'Makassar', province: 'Sulawesi Selatan', lat: -5.147, lng: 119.432, tz: WITA },
  { name: 'Parepare', province: 'Sulawesi Selatan', lat: -4.013, lng: 119.624, tz: WITA },
  { name: 'Palopo', province: 'Sulawesi Selatan', lat: -2.992, lng: 120.196, tz: WITA },
  { name: 'Kendari', province: 'Sulawesi Tenggara', lat: -3.997, lng: 122.513, tz: WITA },

  // Maluku and Papua
  { name: 'Ambon', province: 'Maluku', lat: -3.695, lng: 128.181, tz: WIT },
  { name: 'Sofifi', province: 'Maluku Utara', lat: 0.737, lng: 127.557, tz: WIT },
  { name: 'Ternate', province: 'Maluku Utara', lat: 0.79, lng: 127.384, tz: WIT },
  { name: 'Jayapura', province: 'Papua', lat: -2.533, lng: 140.717, tz: WIT },
  { name: 'Manokwari', province: 'Papua Barat', lat: -0.862, lng: 134.064, tz: WIT },
  { name: 'Sorong', province: 'Papua Barat Daya', lat: -0.876, lng: 131.255, tz: WIT },
  { name: 'Nabire', province: 'Papua Tengah', lat: -3.366, lng: 135.497, tz: WIT },
  { name: 'Timika', province: 'Papua Tengah', lat: -4.546, lng: 136.888, tz: WIT },
  { name: 'Wamena', province: 'Papua Pegunungan', lat: -4.096, lng: 138.948, tz: WIT },
  { name: 'Merauke', province: 'Papua Selatan', lat: -8.493, lng: 140.402, tz: WIT },
]
