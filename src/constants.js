import {Dimensions, Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';

const isNotchPhone = DeviceInfo.hasNotch();
const iphoneNotch = Platform.OS === 'ios' && isNotchPhone;
const screenHeight = Math.round(Dimensions.get('window').height);
const screenWidth = Math.round(Dimensions.get('window').width);

export default {
  utils: {
    getUniqueArray: (array) =>
      [...new Set(array.map((msg) => JSON.stringify(msg)))].map((msg) =>
        JSON.parse(msg),
      ),
  },
  colors: {
    chatBg: '#252331',
    msgSent: '#2467FD',
    msgReceived: '#343246',
    chatDate: '#666883',
    bottomNav: '#1E1C26',
    username: '#ffffff',
  },
  screen: {
    height: screenHeight,
    width: screenWidth,
    iphoneNotchBottomNavHeight: 80,
    bottomNavHeight: () => (iphoneNotch ? 80 : 60),
    postFlatlistHeight() {
      const bottomNavHeight = iphoneNotch ? 80 : 60;
      const topBarHeight = isNotchPhone ? 80 : 55;
      return (
        Math.round(Dimensions.get('window').height) -
        (bottomNavHeight + topBarHeight)
      );
    },
    randomString: () => Math.random().toString(36).split('.')[1],
    isIos: Platform.OS === 'ios',
    isAndroid: Platform.OS === 'android',
    hasNotch: DeviceInfo.hasNotch(),
  },
  apiUrl: {
    local: 'http://localhost:8000',
    live: 'https://chatapp3690.herokuapp.com',
  },
  deviceInfo: DeviceInfo,
  imgur: {clientId: '1f3e35f19556430'},
  styles: {
    loadingView: {
      position: 'absolute',
      zIndex: 99,
      height: screenHeight,
      width: screenWidth,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
  },
  dummy: {
    images: {
      post:
        'https://www.nasa.gov/sites/default/files/styles/image_card_4x3_ratio/public/thumbnails/image/iss063e012660.jpg',
      user: 'https://i.ya-webdesign.com/images/user-avatar-png-7.png',
    },
    songList: [
      {
        '320kbps': 'true',
        album: 'Half Girlfriend',
        album_url:
          'https://www.jiosaavn.com/album/half-girlfriend/Za3iBXuncjM_',
        albumid: '10601320',
        artistMap: {
          'Arafat Mehmood': '469700',
          'Arjun Kapoor': '473371',
          'Ash King': '459583',
          'Shashaa Tirupati': '697946',
          'Shraddha Kapoor': '477854',
          'Tanishk Bagchi': '1595701',
        },
        cache_state: 'false',
        copyright_text: '2017 Zee Music Company',
        duration: '276',
        encrypted_media_path:
          'NMKyboFo/FjsFvTs6db/WFUXLKPumHmKYvCd9ducvt7bHc9uxMlt+FqBfZipfaNj',
        encrypted_media_url:
          'ID2ieOjCrwfgWvL5sXl4B1ImC5QfbsDyFbhHotHnckP6Vd1JQF2yDxyJYtN6WQFNJgRFNoOzvz2Do/rmMEUmnxw7tS9a8Gtq',
        explicit_content: 0,
        featured_artists: '',
        featured_artists_id: '',
        has_lyrics: 'true',
        id: 'injzG32Z',
        image:
          'https://c.saavncdn.com/441/Half-Girlfriend-Hindi-2017-20180622-500x500.jpg',
        label: 'Zee Music Co.',
        label_url: '/label/zee-music-co.-albums/06cepoPTlhU_',
        language: 'hindi',
        lyrics_snippet: 'Ho poori tujhi se meri ye kahani',
        media_preview_url:
          'https://preview.saavncdn.com/441/41916e6d7a128fbfc03d64e317361eec_96_p.mp4',
        media_url:
          'https://sklktcdnems04.cdnsrv.jio.com/h.saavncdn.com/441/41916e6d7a128fbfc03d64e317361eec_320.mp3',
        music: 'Tanishk Bagchi',
        music_id: '1595701',
        origin: 'none',
        perma_url: 'https://www.jiosaavn.com/song/baarish/GQYBSzMDBWk',
        play_count: 56385076,
        primary_artists: 'Ash King, Shashaa Tirupati',
        primary_artists_id: '459583, 697946',
        release_date: '2017-04-24',
        rights: {
          cacheable: true,
          code: 0,
          delete_cached_object: false,
          reason: '',
        },
        singers: 'Ash King, Shashaa Tirupati',
        song: 'Baarish',
        starred: 'false',
        starring: 'Arjun Kapoor, Shraddha Kapoor',
        type: '',
        vcode: '010910440596018',
        vlink:
          'https://jiotunepreview.jio.com/content/Converted/010910440564900.mp3',
        year: '2017',
      },
      {
        '320kbps': 'true',
        album: 'Yaariyan',
        album_url: 'https://www.jiosaavn.com/album/yaariyan/vr21v5dVPbw_',
        albumid: '1147457',
        artistMap: {
          'Dev Sharma': '681822',
          'Evelyn Sharma': '490569',
          'Gajendra Verma': '531880',
          'Himansh Kohli': '681817',
          Mithoon: '702592',
          'Mithun Chakraborty': '456386',
          'Mohammed Irfan': '743983',
          'Nicole Faria': '681820',
          Pardi: '681821',
          'Rakul Preet': '681819',
        },
        cache_state: 'false',
        copyright_text: '&copy; 2013 T-Series',
        duration: '374',
        encrypted_media_path:
          'NMKyboFo/FiRre4mYAgaUEAmAB5jJG/fEPiSZq/RxVWuB351stalMxkiALeEEk2Z',
        encrypted_media_url:
          'ID2ieOjCrwfgWvL5sXl4B1ImC5QfbsDy2+w5Pw8BtLXY+DijBiUeMuHnWP8wpuQFds5Ca34gJJmhmSl1PV+qlxw7tS9a8Gtq',
        explicit_content: 0,
        featured_artists: '',
        featured_artists_id: '',
        has_lyrics: 'false',
        id: 'TPYI7vWa',
        image: 'https://c.saavncdn.com/503/Yaariyan-Hindi-2013-500x500.jpg',
        label: 'T-Series',
        label_url: '/label/t-series-albums/6DLuXO3VoTo_',
        language: 'hindi',
        lyrics_snippet: '',
        media_preview_url:
          'https://preview.saavncdn.com/503/4810b42acc4eb25251c191343abca555_96_p.mp4',
        media_url:
          'https://snoidcdnems02.cdnsrv.jio.com/h.saavncdn.com/503/4810b42acc4eb25251c191343abca555_320.mp3',
        music: 'Mithoon',
        music_id: '702592',
        origin: 'none',
        perma_url:
          'https://www.jiosaavn.com/song/baarish---yaariyan/JDgyeENGYFI',
        play_count: 11395902,
        primary_artists: 'Mithoon, Mohammed Irfan, Gajendra Verma',
        primary_artists_id: '702592, 743983, 531880',
        release_date: '2013-11-26',
        rights: {
          cacheable: true,
          code: 0,
          delete_cached_object: false,
          reason: '',
        },
        singers: 'Mohammed Irfan, Gajendra Verma',
        song: 'Baarish - Yaariyan',
        starred: 'false',
        starring:
          'Himansh Kohli, Rakul Preet, Evelyn Sharma, Nicole Faria, Pardi, Dev Sharma',
        type: '',
        vcode: '010910090344237',
        vlink:
          'https://jiotunepreview.jio.com/content/Converted/010910090380410.mp3',
        year: '2013',
      },
      {
        '320kbps': 'true',
        album: 'Hume Tumse Pyaar Kitna',
        album_url:
          'https://www.jiosaavn.com/album/hume-tumse-pyaar-kitna/tvHsDmrwULY_',
        albumid: '16526298',
        artistMap: {
          'Jubin Nautiyal': '881158',
          'Raaj Aashoo': '466955',
          'Shabbir Ahmed': '461011',
        },
        cache_state: 'false',
        copyright_text: '℗ 2019 Super Cassettes Industries Private Limited',
        duration: '205',
        encrypted_media_path:
          'NMKyboFo/FhGNj4RpzRiHQuzlPBPd9075s/Jpx7whIjG8sxbDsgqg3XA7ygaKNJd',
        encrypted_media_url:
          'ID2ieOjCrwfgWvL5sXl4B1ImC5QfbsDylJzMItN1FiumlyCSCmiW+e0yqxTqF08FVgohzGYAB3A2NDprkEU4Ehw7tS9a8Gtq',
        explicit_content: 0,
        featured_artists: '',
        featured_artists_id: '',
        has_lyrics: 'true',
        id: 'HGseQvDf',
        image:
          'https://c.saavncdn.com/869/Hume-Tumse-Pyaar-Kitna-Hindi-2019-20190712135035-500x500.jpg',
        label: 'T-Series',
        label_url: '/label/t-series-albums/6DLuXO3VoTo_',
        language: 'hindi',
        lyrics_snippet: 'jo kuch bhi hai kah bhi do',
        media_preview_url:
          'https://preview.saavncdn.com/869/b5f04f2ab1f03c5dbb07493cec1f6e84_96_p.mp4',
        media_url:
          'https://snoidcdnems07.cdnsrv.jio.com/h.saavncdn.com/869/b5f04f2ab1f03c5dbb07493cec1f6e84_320.mp3',
        music: 'Raaj Aashoo',
        music_id: '466955',
        origin: 'none',
        perma_url: 'https://www.jiosaavn.com/song/baarish/OC8YVCVGc1U',
        play_count: 583609,
        primary_artists: 'Jubin Nautiyal',
        primary_artists_id: '881158',
        release_date: '2019-07-09',
        rights: {
          cacheable: true,
          code: 0,
          delete_cached_object: false,
          reason: '',
        },
        singers: 'Jubin Nautiyal',
        song: 'Baarish',
        starred: 'false',
        starring: '',
        type: '',
        vcode: '010910091004893',
        vlink:
          'https://jiotunepreview.jio.com/content/Converted/010910090961145.mp3',
        year: '2019',
      },
      {
        '320kbps': 'true',
        album: 'Lafda Ho No Jaye',
        album_url:
          'https://www.jiosaavn.com/album/lafda-ho-no-jaye/UvATVv4R3-A_',
        albumid: '1243762',
        artistMap: {
          'Anu Malik': '456338',
          'Shyam Anuragi': '458042',
        },
        cache_state: 'false',
        copyright_text: '(P) 1997 Sony Music Entertainment India Pvt. Ltd.',
        duration: '288',
        encrypted_media_path:
          'NMKyboFo/Fh9CWSD0AlxwDn/ChibAK0+O09lJQLdrrxvbUyOe7UdJQfsObgcK7LK',
        encrypted_media_url:
          'ID2ieOjCrwfgWvL5sXl4B1ImC5QfbsDycZEr+RFMp4wYJJ/9r8tRG98pc5OeZOq0WWE6IOC5WV+JRE966kfjQhw7tS9a8Gtq',
        explicit_content: 0,
        featured_artists: '',
        featured_artists_id: '',
        has_lyrics: 'false',
        id: '0g6dBUev',
        image: 'https://c.saavncdn.com/099/SONY_886443571099-500x500.jpg',
        label: 'Magnasound',
        label_url: '/label/magnasound-albums/8LI-WIqulsA_',
        language: 'hindi',
        lyrics_snippet: '',
        media_preview_url:
          'https://preview.saavncdn.com/099/dcfa2eed69b9eff126f2dc73de5a1b65_96_p.mp4',
        media_url:
          'https://snoidcdnems06.cdnsrv.jio.com/h.saavncdn.com/099/dcfa2eed69b9eff126f2dc73de5a1b65_320.mp3',
        music: 'Anu Malik',
        music_id: '456338',
        origin: 'none',
        perma_url: 'https://www.jiosaavn.com/song/baarish/QA9dVTZlUkU',
        play_count: 187191,
        primary_artists: 'Anu Malik',
        primary_artists_id: '456338',
        release_date: '1997-03-12',
        rights: {
          cacheable: true,
          code: 0,
          delete_cached_object: false,
          reason: '',
        },
        singers: 'Anu Malik',
        song: 'Baarish',
        starred: 'false',
        starring: '',
        type: '',
        vcode: '010910140012978',
        vlink:
          'https://jiotunepreview.jio.com/content/Converted/010910140015756.mp3',
        year: '1997',
      },
      {
        '320kbps': 'true',
        album: 'Baarish',
        album_url: 'https://www.jiosaavn.com/album/baarish/VJY065eOl,g_',
        albumid: '14228120',
        artistMap: {
          'Bilal Saeed': '476685',
          'Neha Kakkar': '464932',
        },
        cache_state: 'false',
        copyright_text: '℗ 2018 Desi Music Factory',
        duration: '154',
        encrypted_media_path:
          'NMKyboFo/Fi9mMCL67Qm6hQ/BmmoTPxSy6/d7TsxHoAsu8gZ5+WXGIiIdD7XQ6r7',
        encrypted_media_url:
          'ID2ieOjCrwfgWvL5sXl4B1ImC5QfbsDynXtBQIFOkUPoguE3XCaXbw1vYxN8cUtDh2AgFonQGeeYtkJH3RpT6Bw7tS9a8Gtq',
        explicit_content: 0,
        featured_artists: '',
        featured_artists_id: '',
        has_lyrics: 'true',
        id: '4eo8nWxf',
        image:
          'https://c.saavncdn.com/282/Baarish-Punjabi-2018-20181029205514-500x500.jpg',
        label: 'Desi Music Factory',
        label_url: '/label/desi-music-factory-albums/qGinOqyqfw0_',
        language: 'punjabi',
        lyrics_snippet: 'tu ik vaari aaja ve ki dil zaraa lage jaave',
        media_preview_url:
          'https://preview.saavncdn.com/282/4d3b9dfdad0b3170f982dc7728b0a32b_96_p.mp4',
        media_url:
          'https://snoidcdnems05.cdnsrv.jio.com/h.saavncdn.com/282/4d3b9dfdad0b3170f982dc7728b0a32b_320.mp3',
        music: 'Bilal Saeed',
        music_id: '476685',
        origin: 'none',
        perma_url: 'https://www.jiosaavn.com/song/baarish/RA0ECRpnT1U',
        play_count: 971544,
        primary_artists: 'Neha Kakkar',
        primary_artists_id: '464932',
        release_date: '2018-11-01',
        rights: {
          cacheable: true,
          code: 0,
          delete_cached_object: false,
          reason: '',
        },
        singers: 'Neha Kakkar',
        song: 'Baarish',
        starred: 'false',
        starring: '',
        type: '',
        year: '2018',
      },
    ],
    trackPlayerTracks: [
      {
        id: 'injzG32Z',
        url:
          'https://sklktcdnems04.cdnsrv.jio.com/h.saavncdn.com/441/41916e6d7a128fbfc03d64e317361eec_320.mp3',
        title: 'Baarish - Ash King, Shashaa Tirupati',
        artist: 'Ash King, Shashaa Tirupati',
        artwork:
          'https://c.saavncdn.com/441/Half-Girlfriend-Hindi-2017-20180622-500x500.jpg',
        duration: 276,
      },
      {
        id: 'TPYI7vWa',
        url:
          'https://snoidcdnems02.cdnsrv.jio.com/h.saavncdn.com/503/4810b42acc4eb25251c191343abca555_320.mp3',
        title: 'Baarish - Yaariyan - Mohammed Irfan, Gajendra Verma',
        artist: 'Mohammed Irfan, Gajendra Verma',
        artwork: 'https://c.saavncdn.com/503/Yaariyan-Hindi-2013-500x500.jpg',
        duration: 374,
      },
      {
        id: 'HGseQvDf',
        url:
          'https://snoidcdnems07.cdnsrv.jio.com/h.saavncdn.com/869/b5f04f2ab1f03c5dbb07493cec1f6e84_320.mp3',
        title: 'Baarish - Jubin Nautiyal',
        artist: 'Jubin Nautiyal',
        artwork:
          'https://c.saavncdn.com/869/Hume-Tumse-Pyaar-Kitna-Hindi-2019-20190712135035-500x500.jpg',
        duration: 205,
      },
      {
        id: '0g6dBUev',
        url:
          'https://snoidcdnems06.cdnsrv.jio.com/h.saavncdn.com/099/dcfa2eed69b9eff126f2dc73de5a1b65_320.mp3',
        title: 'Baarish - Anu Malik',
        artist: 'Anu Malik',
        artwork: 'https://c.saavncdn.com/099/SONY_886443571099-500x500.jpg',
        duration: 288,
      },
      {
        id: '4eo8nWxf',
        url:
          'https://snoidcdnems05.cdnsrv.jio.com/h.saavncdn.com/282/4d3b9dfdad0b3170f982dc7728b0a32b_320.mp3',
        title: 'Baarish - Neha Kakkar',
        artist: 'Neha Kakkar',
        artwork:
          'https://c.saavncdn.com/282/Baarish-Punjabi-2018-20181029205514-500x500.jpg',
        duration: 154,
      },
    ],
  },
};
