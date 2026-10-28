import { memo } from 'react';
import classNames from 'clsx';
import { IconTheme } from '../consts/icon';
import { IconProps } from '../types/icon';
import cls from './Icon.module.scss';

export const Icon = memo(function Icon(props: IconProps) {
  const {
    className,
    Svg,
    theme = IconTheme.SECONDARY,
    size = '16',
    width,
    height,
    measure,
    clickable,
    ...otherProps
  } = props;

  const widthElastic = getMeasure(width, measure);
  const heightElastic = getMeasure(height, measure);

  const icon = (
    <Svg
      style={{ width: widthElastic, height: heightElastic }}
      className={classNames(
        className,
        cls[theme],
        cls.icon,
        cls[`size${size}`],
      )}
      {...otherProps}
      onClick={undefined}
    />
  );

  if (clickable) {
    return (
      <button
        type="button"
        className={cls.button}
        onClick={props.onClick}
        style={{ height, width }}
      >
        {icon}
      </button>
    );
  }

  return icon;
});

Icon.displayName = 'Icon';

function getElasticIfNumber(size: number | string): string {
  if (typeof size === 'number') {
    return `${size / 16}rem`;
  }
  return size;
}

function getMeasure(
  size?: number | string,
  measure?: number | string,
): string | undefined {
  if (measure) {
    return getElasticIfNumber(measure);
  }

  if (size) {
    return getElasticIfNumber(size);
  }

  return undefined;
}
