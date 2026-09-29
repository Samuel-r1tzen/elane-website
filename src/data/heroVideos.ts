import poster1 from '../assets/images/posters/poster_7957041.jpg';
import poster2 from '../assets/images/posters/poster_7148182.jpg';
import poster3 from '../assets/images/posters/poster_7957034.jpg';
import poster4 from '../assets/images/posters/poster_8056093.jpg';
import poster5 from '../assets/images/posters/poster_11328619.jpg';

export interface HeroVideoSequence {
  id: string;
  title: string;
  subtitle: string;
  focalPosition: string; // e.g., 'center 30%'
  modelAlignment: 'left' | 'center' | 'right';
  scale?: number;
  sources: {
    hd: string;
    direct: string;
    downloadFallback: string;
  };
  poster: string;
  duration: number; // in seconds
}

export const HERO_VIDEOS: HeroVideoSequence[] = [
  {
    id: 'seq-01',
    title: 'THE MOVEMENT',
    subtitle: 'SEQUENCE 01 / FORM STUDY',
    focalPosition: 'center 35%',
    modelAlignment: 'right',
    sources: {
      hd: 'https://videos.pexels.com/video-files/7957041/7957041-hd_1080_1920_30fps.mp4',
      direct: 'https://videos.pexels.com/video-files/7957041/7957041-uhd_2160_3840_30fps.mp4',
      downloadFallback: 'https://www.pexels.com/download/video/7957041/'
    },
    poster: poster1,
    duration: 9.16
  },
  {
    id: 'seq-02',
    title: 'THE SILHOUETTE',
    subtitle: 'SEQUENCE 02 / OUTERWEAR VOLUMETRICS',
    focalPosition: 'center 30%',
    modelAlignment: 'center',
    sources: {
      hd: 'https://videos.pexels.com/video-files/7148182/7148182-hd_1080_1920_24fps.mp4',
      direct: 'https://videos.pexels.com/video-files/7148182/7148182-hd_1080_1920_24fps.mp4',
      downloadFallback: 'https://www.pexels.com/download/video/7148182/'
    },
    poster: poster2,
    duration: 9.83
  },
  {
    id: 'seq-03',
    title: 'ANATOMICAL DRAPE',
    subtitle: 'SEQUENCE 03 / TROPICAL WOOL MOTION',
    focalPosition: 'center 38%',
    modelAlignment: 'right',
    sources: {
      hd: 'https://videos.pexels.com/video-files/7957034/7957034-hd_1080_1920_30fps.mp4',
      direct: 'https://videos.pexels.com/video-files/7957034/7957034-uhd_2160_3840_30fps.mp4',
      downloadFallback: 'https://www.pexels.com/download/video/7957034/'
    },
    poster: poster3,
    duration: 9.13
  },
  {
    id: 'seq-04',
    title: 'MONOCHROME KINETICS',
    subtitle: 'SEQUENCE 04 / BRUTALIST AIRFLOW',
    focalPosition: 'center 35%',
    modelAlignment: 'center',
    scale: 0.82,
    sources: {
      hd: 'https://videos.pexels.com/video-files/8056093/8056093-hd_1080_1920_30fps.mp4',
      direct: 'https://videos.pexels.com/video-files/8056093/8056093-uhd_2160_3840_30fps.mp4',
      downloadFallback: 'https://www.pexels.com/download/video/8056093/'
    },
    poster: poster4,
    duration: 8.66
  },
  {
    id: 'seq-05',
    title: 'ARCHITECTURAL CADENCE',
    subtitle: 'SEQUENCE 05 / JOHANNESBURG ATELIER',
    focalPosition: 'center 28%',
    modelAlignment: 'center',
    sources: {
      hd: 'https://videos.pexels.com/video-files/11328619/11328619-hd_1080_1918_50fps.mp4',
      direct: 'https://videos.pexels.com/video-files/11328619/11328619-hd_1080_1918_50fps.mp4',
      downloadFallback: 'https://www.pexels.com/download/video/11328619/'
    },
    poster: poster5,
    duration: 28.02
  }
];
