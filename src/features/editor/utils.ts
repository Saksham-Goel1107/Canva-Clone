import { createId } from '@paralleldrive/cuid2';
import { fabric } from 'fabric';
import type { RGBColor } from 'react-color';

import type { filters } from './types';

export async function transformText(objects: any) {
  if (!objects) return;

  objects.forEach((object: any) => {
    if (object.objects) transformText(object.objects);
    else {
      object.type === 'text' && (object.type = 'textbox');
    }
  });
}

export function downloadFile(file: string, type: string) {
  const anchorElement = document.createElement('a');

  anchorElement.href = file;
  anchorElement.download = `${createId()}.${type}`;

  document.body.appendChild(anchorElement);
  anchorElement.click();
  anchorElement.remove();
}

export function isTextType(type: string | undefined) {
  return type === 'text' || type === 'i-text' || type === 'textbox';
}

export function rgbaObjectToString(rgba: RGBColor | 'transparent') {
  if (rgba === 'transparent') return `rgba(0, 0, 0, 0)`;

  const alpha = rgba.a === undefined ? 1 : rgba.a;

  return `rgba(${rgba.r}, ${rgba.g}, ${rgba.b}, ${alpha})`;
}

export function createFilter(value: (typeof filters)[number]) {
  let effect;

  switch (value) {
    case 'polaroid':
      // @ts-ignore polaroid filter types aren't added.
      effect = new fabric.Image.filters.Polaroid();
      break;
    case 'sepia':
      effect = new fabric.Image.filters.Sepia();
      break;
    case 'kodachrome':
      // @ts-ignore koda chrome filter types aren't added.
      effect = new fabric.Image.filters.Kodachrome();
      break;
    case 'contrast':
      effect = new fabric.Image.filters.Contrast({ contrast: 0.3 });
      break;
    case 'brightness':
      effect = new fabric.Image.filters.Brightness({ brightness: 0.8 });
      break;
    case 'greyscale':
      effect = new fabric.Image.filters.Grayscale();
      break;
    case 'brownie':
      // @ts-ignore brownie filter types aren't added.
      effect = new fabric.Image.filters.Brownie();
      break;
    case 'vintage':
      // @ts-ignore vintage filter types aren't added.
      effect = new fabric.Image.filters.Vintage();
      break;
    case 'technicolor':
      // @ts-ignore technicolor filter types aren't added.
      effect = new fabric.Image.filters.Technicolor();
      break;
    case 'pixelate':
      effect = new fabric.Image.filters.Pixelate();
      break;
    case 'invert':
      effect = new fabric.Image.filters.Invert();
      break;
    case 'blur':
      effect = new fabric.Image.filters.Blur({
        blur: 0.6,
      });
      break;
    case 'sharpen':
      effect = new fabric.Image.filters.Convolute({
        matrix: [0, -1, 0, -1, 5, -1, 0, -1, 0],
      });
      break;
    case 'emboss':
      effect = new fabric.Image.filters.Convolute({
        matrix: [1, 1, 1, 1, 0.7, -1, -1, -1, -1],
      });
      break;
    case 'removecolor':
      // @ts-ignore remove color filter types aren't added.
      effect = new fabric.Image.filters.RemoveColor({
        threshold: 0.2,
        distance: 0.5,
      });
      break;
    case 'blacknwhite':
      // @ts-ignore black white filter types aren't added.
      effect = new fabric.Image.filters.BlackWhite({
        threshold: 0.2,
        distance: 0.5,
      });
      break;
    case 'vibrance':
      // @ts-ignore vibrance filter types aren't added.
      effect = new fabric.Image.filters.Vibrance({
        vibrance: 1,
      });
      break;
    case 'blendcolor':
      effect = new fabric.Image.filters.BlendColor({
        color: '#00ff00',
        mode: 'multiply',
      });
      break;
    case 'huerotate':
      effect = new fabric.Image.filters.HueRotation({
        rotation: 0.5,
      });
      break;
    case 'resize':
      effect = new fabric.Image.filters.Resize();
      break;
    case 'saturation':
      effect = new fabric.Image.filters.Saturation({
        saturation: 0.7,
      });
      break;
    case 'gamma':
      // @ts-ignore gamma filter types aren't added.
      effect = new fabric.Image.filters.Gamma({
        gamma: [1, 0.5, 2.1],
      });
      break;
    default:
      effect = null;
  }

  return effect;
}
