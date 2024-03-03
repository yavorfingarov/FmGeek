export const defaultTimeout = 120;

export const defaultUiSettings = {
    theme: "auto",
    recentCount: 3
};

export const historyLength = 10;

export const defaultStations = [
    {
        groupName: "Classical",
        prependToStationName: false,
        stations: [
            {
                name: "NDR Kultur",
                stream: "https://icecast.ndr.de/ndr/ndrkultur/live/aac/192/stream.aac",
                website: "https://www.ndr.de/kultur/"
            },
            {
                name: "WDR 3 Live",
                stream: "https://wdr-wdr3-live.icecastssl.wdr.de/wdr/wdr3/live/mp3/256/stream.mp3",
                website: "https://www1.wdr.de/radio/wdr3/index.html"
            },
            {
                name: "WDR 3 Klassik",
                stream: "https://wdr-wdr3-klassik.icecast.wdr.de/wdr/wdr3/klassik/mp3/128/stream.mp3",
                website: "https://www1.wdr.de/radio/wdr3/index.html"
            },
            {
                name: "hr2-kultur",
                stream: "https://dispatcher.rndfnk.com/hr/hr2/live/mp3/high",
                website: "https://www.hr2.de/index.html"
            },
            {
                name: "SWR2",
                stream: "https://liveradio.swr.de/sw282p3/swr2/",
                website: "https://www.swr.de/swr2/index.html"
            },
            {
                name: "BR-KLASSIK",
                stream: "https://dispatcher.rndfnk.com/br/brklassik/live/mp3/high",
                website: "https://www.br-klassik.de/index.html"
            },
            {
                name: "Ö1",
                stream: "https://orf-live.ors-shoutcast.at/oe1-q2a",
                website: "https://oe1.orf.at/"
            },
            {
                name: "radio klassik",
                stream: "https://radioklassikstephansdom.ice.infomaniak.ch/radioklassikstephansdom.mp3",
                website: "https://radioklassik.at/"
            },
            {
                name: "NRK Klassisk",
                stream: "https://lyd.nrk.no/nrk_radio_klassisk_aac_h",
                website: "https://radio.nrk.no/direkte/klassisk"
            },
            {
                name: "NPO Klassiek",
                stream: "https://icecast.omroep.nl/radio4-bb-mp3",
                website: "https://www.nporadio4.nl"
            },
            {
                name: "Radio Classic A",
                stream: "https://a2.vizitec.com:8001/classica.mp3",
                website: "https://radioclassica.bg/"
            },
            {
                name: "Concertgebouworkest",
                stream: "https://i2.cdn.jetstre.am:8000/sz=RCOLiveWebradio=mp3-192",
                website: "https://www.concertgebouworkest.nl/radio"
            },
            {
                name: "Ancient FM",
                stream: "https://mediaserv73.live-streams.nl:18058/stream",
                website: "https://ancientfm.com/"
            },
            {
                name: "Venice Classic Radio",
                stream: "https://uk2.streamingpulse.com/ssl/vcr1",
                website: "https://www.veniceclassicradio.eu"
            },
            {
                name: "ABC Classic",
                stream: "https://live-radio01.mediahubaustralia.com/2FMW/aac",
                website: "https://www.abc.net.au/listen/classic"
            },
            {
                name: "ABC Classic 2",
                stream: "https://live-radio01.mediahubaustralia.com/FM2W/aac",
                website: "https://www.abc.net.au/listen/live/classic2"
            },
            {
                name: "WCPE North Carolina",
                stream: "https://playerservices.streamtheworld.com/api/livestream-redirect/WCPE_FM.mp3",
                website: "https://theclassicalstation.org/"
            },
            {
                name: "WUOL Louisville",
                stream: "https://lpm.streamguys1.com/wuol-popup",
                website: "https://www.lpm.org/classical"
            },
            {
                name: "KMFA Austin",
                stream: "https://kmfa.streamguys1.com/KMFA-mp3",
                website: "https://www.kmfa.org/"
            },
            {
                name: "WWFM New Jersey",
                stream: "https://wwfm.streamguys1.com/live",
                website: "https://www.wwfm.org/"
            },
            {
                name: "WQXR New York",
                stream: "https://stream.wqxr.org/wqxr-web",
                website: "https://www.wqxr.org/"
            }
        ]
    },
    {
        groupName: "Concertzender",
        prependToStationName: true,
        stations: [
            {
                name: "Live",
                stream: "https://streams.greenhost.nl:8006/live",
                website: "https://www.concertzender.nl"
            },
            {
                name: "Early Music",
                stream: "https://streams.greenhost.nl:8006/oudemuziek",
                website: "https://www.concertzender.nl"
            },
            {
                name: "Gregorian Chant",
                stream: "https://streams.greenhost.nl:8006/gregoriaans",
                website: "https://www.concertzender.nl"
            },
            {
                name: "Baroque",
                stream: "https://streams.greenhost.nl:8006/barok",
                website: "https://www.concertzender.nl"
            },
            {
                name: "Bach Ad Infinitum",
                stream: "https://streams.greenhost.nl:8006/bach",
                website: "https://www.concertzender.nl"
            },
            {
                name: "Classical Music",
                stream: "https://streams.greenhost.nl:8006/klassiek",
                website: "https://www.concertzender.nl"
            },
            {
                name: "Opera",
                stream: "https://streams.greenhost.nl:8006/opera",
                website: "https://www.concertzender.nl"
            },
            {
                name: "Contemporary Music",
                stream: "https://streams.greenhost.nl:8006/nieuwemuziek",
                website: "https://www.concertzender.nl"
            },
            {
                name: "Ambient",
                stream: "https://streams.greenhost.nl:8006/gehoordestilte",
                website: "https://www.concertzender.nl"
            },
            {
                name: "World Music",
                stream: "https://streams.greenhost.nl:8006/wereldmuziek",
                website: "https://www.concertzender.nl"
            },
            {
                name: "Orient Express",
                stream: "https://streams.greenhost.nl:8006/orientexpress",
                website: "https://www.concertzender.nl"
            },
            {
                name: "Chanson",
                stream: "https://streams.greenhost.nl:8006/chanson",
                website: "https://www.concertzender.nl"
            },
            {
                name: "Interfaces",
                stream: "https://streams.greenhost.nl:8006/raakvlakken",
                website: "https://www.concertzender.nl"
            },
            {
                name: "Jazz",
                stream: "https://streams.greenhost.nl:8006/jazz",
                website: "https://www.concertzender.nl"
            },
            {
                name: "Hard Bop",
                stream: "https://streams.greenhost.nl:8006/hardbop",
                website: "https://www.concertzender.nl"
            },
            {
                name: "JazzNotJazz",
                stream: "https://streams.greenhost.nl:8006/jazznotjazz",
                website: "https://www.concertzender.nl"
            },
            {
                name: "Crosslinks",
                stream: "https://streams.greenhost.nl:8006/pop",
                website: "https://www.concertzender.nl"
            }
        ]
    },
    {
        groupName: "Radio France",
        prependToStationName: true,
        stations: [
            {
                name: "Live",
                stream: "https://icecast.radiofrance.fr/francemusique-hifi.aac",
                website: "https://www.radiofrance.fr/francemusique"
            },
            {
                name: "Baroque",
                stream: "https://icecast.radiofrance.fr/francemusiquebaroque-hifi.aac",
                website: "https://www.radiofrance.fr/francemusique"
            },
            {
                name: "Classique",
                stream: "https://icecast.radiofrance.fr/francemusiqueclassiqueplus-hifi.aac",
                website: "https://www.radiofrance.fr/francemusique"
            },
            {
                name: "Opéra",
                stream: "https://icecast.radiofrance.fr/francemusiqueopera-hifi.aac",
                website: "https://www.radiofrance.fr/francemusique"
            },
            {
                name: "Concerts",
                stream: "https://icecast.radiofrance.fr/francemusiqueconcertsradiofrance-hifi.aac",
                website: "https://www.radiofrance.fr/francemusique"
            },
            {
                name: "Contemporaine",
                stream: "https://icecast.radiofrance.fr/francemusiquelacontemporaine-hifi.aac",
                website: "https://www.radiofrance.fr/francemusique"
            },
            {
                name: "Jazz",
                stream: "https://icecast.radiofrance.fr/francemusiquelajazz-hifi.aac",
                website: "https://www.radiofrance.fr/francemusique"
            },
            {
                name: "Films",
                stream: "https://icecast.radiofrance.fr/francemusiquelabo-hifi.aac",
                website: "https://www.radiofrance.fr/francemusique"
            },
            {
                name: "Ocora Monde",
                stream: "https://icecast.radiofrance.fr/francemusiqueocoramonde-hifi.aac",
                website: "https://www.radiofrance.fr/francemusique"
            },
            {
                name: "Chanson",
                stream: "https://icecast.radiofrance.fr/fipsacrefrancais-hifi.aac",
                website: "https://www.radiofrance.fr/fip"
            },
            {
                name: "Monde",
                stream: "https://icecast.radiofrance.fr/fipworld-hifi.aac",
                website: "https://www.radiofrance.fr/fip"
            }
        ]
    },
    {
        groupName: "Jazz",
        prependToStationName: false,
        stations: [
            {
                name: "NRK Jazz",
                stream: "https://lyd.nrk.no/nrk_radio_jazz_aac_h",
                website: "https://radio.nrk.no/direkte/jazz"
            },
            {
                name: "DR P8 Jazz",
                stream: "https://drliveradio.akamaized.net/hls/live/2022411/p8jazz/masterab.m3u8",
                website: "https://www.dr.dk/lyd/playlister/p8jazz"
            },
            {
                name: "WDR 3 Jazz",
                stream: "https://wdr-wdr3-jazz.icecast.wdr.de/wdr/wdr3/jazz/mp3/128/stream.mp3",
                website: "https://www1.wdr.de/radio/wdr3/index.html"
            },
            {
                name: "PR Niezły Jazz",
                stream: "https://stream85.polskieradio.pl/omniaaxe/k103.stream/playlist.m3u8",
                website: "https://moje.polskieradio.pl/#/115?gsid=106"
            },
            {
                name: "CRo Jazz",
                stream: "https://rozhlas.stream/jazz_high.aac",
                website: "https://jazz.rozhlas.cz/"
            },
            {
                name: "Antena 2 Jazzin'",
                stream: "https://radiocast.rtp.pt/antena2jazzin80a.mp3",
                website: "https://www.rtp.pt/play/direto/antena2jazzin"
            },
            {
                name: "ABC Jazz",
                stream: "https://live-radio01.mediahubaustralia.com/JAZW/aac",
                website: "https://www.abc.net.au/listen/jazz"
            },
            {
                name: "Jazz24 Seattle",
                stream: "https://live.amperwave.net/direct/ppm-jazz24aac256-ibc1",
                website: "https://www.jazz24.org/"
            },
            {
                name: "WBGO Newark",
                stream: "https://wbgo.streamguys1.com/wbgo",
                website: "https://www.wbgo.org/"
            },
            {
                name: "WBGO The Jazz Bee",
                stream: "https://wbgo.streamguys1.com/thejazzstream",
                website: "https://www.wbgo.org/"
            },
            {
                name: "Jazz 88 San Diego",
                stream: "https://ksds-ice.streamguys1.com/ksds.mp3",
                website: "https://www.jazz88.org/"
            },
            {
                name: "KCSM San Mateo",
                stream: "https://ice7.securenetsystems.net/KCSM2",
                website: "https://www.kcsm.org/"
            },
            {
                name: "KMHD Portland",
                stream: "https://ais-sa3.cdnstream1.com/2442_128.aac",
                website: "https://www.kmhd.org/"
            },
            {
                name: "WWFM New Jersey JazzOn2",
                stream: "https://ice8.securenetsystems.net/JAZZON2",
                website: "https://www.wwfm.org/"
            }
        ]
    },
    {
        groupName: "SomaFM",
        prependToStationName: true,
        stations: [
            {
                name: "Sonic Universe",
                stream: "https://ice1.somafm.com/sonicuniverse-256-mp3",
                website: "https://somafm.com/sonicuniverse/"
            },
            {
                name: "Space Station Soma",
                stream: "https://ice2.somafm.com/spacestation-128-mp3",
                website: "https://somafm.com/spacestation/"
            },
            {
                name: "Secret Agent",
                stream: "https://ice1.somafm.com/secretagent-128-mp3",
                website: "https://somafm.com/secretagent/"
            },
            {
                name: "Lush",
                stream: "https://ice1.somafm.com/lush-128-mp3",
                website: "https://somafm.com/lush/"
            },
            {
                name: "Bossa Beyond",
                stream: "https://ice1.somafm.com/bossa-256-mp3",
                website: "https://somafm.com/bossa/"
            },
            {
                name: "Fluid",
                stream: "https://ice1.somafm.com/fluid-128-mp3",
                website: "https://somafm.com/fluid/"
            },
            {
                name: "cliqhop idm",
                stream: "https://ice1.somafm.com/cliqhop-256-mp3",
                website: "https://somafm.com/cliqhop/"
            },
            {
                name: "DEF CON",
                stream: "https://ice1.somafm.com/defcon-256-mp3",
                website: "https://somafm.com/defcon/"
            },
            {
                name: "Drone Zone",
                stream: "https://ice1.somafm.com/dronezone-256-mp3",
                website: "https://somafm.com/dronezone/"
            },
            {
                name: "Synphaera",
                stream: "https://ice1.somafm.com/synphaera-256-mp3",
                website: "https://somafm.com/synphaera/"
            }
        ]
    },
    {
        groupName: "World",
        prependToStationName: false,
        stations: [
            {
                name: "Worldwide FM",
                stream: "https://worldwidefm.out.airtime.pro/worldwidefm_b",
                website: "https://worldwidefm.net"
            },
            {
                name: "WDR 3 World",
                stream: "https://wdr-wdr3-world.icecast.wdr.de/wdr/wdr3/world/mp3/128/stream.mp3",
                website: "https://www1.wdr.de/radio/wdr3/index.html"
            },
            {
                name: "Antena 1 Fado",
                stream: "https://radiocast.rtp.pt/antena1fado80a.mp3",
                website: "https://www.rtp.pt/play/direto/antena1fado"
            },
            {
                name: "Voz Online",
                stream: "https://stream.radiojar.com/e4kgynu5a5zuv",
                website: "https://vozonlineradio.pt"
            },
            {
                name: "WMR",
                stream: "https://stream.probroadcast.dk/wmr",
                website: "https://wmr.dk"
            }
        ]
    }
];
