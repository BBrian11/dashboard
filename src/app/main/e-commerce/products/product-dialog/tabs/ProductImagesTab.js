import { red } from '@mui/material/colors';
import { styled } from '@mui/material/styles';
import { Controller, useFormContext } from 'react-hook-form';
import Config from '../../../../../../_mysource/config/Config';
import ProductImage from './../../../../../../_mysource/models/ProductImage';
import cloneDeep from 'lodash/cloneDeep';
import Icon from '@mui/material/Icon';
import IconButton from '@mui/material/IconButton';
import RemoveCircle from '@mui/icons-material/RemoveCircle';


const Root = styled('div')(({ theme }) => ({
  '& .productImageFeaturedStar': {
    position: 'absolute',
    top: 0,
    right: 0,
    color: red[600],
    opacity: 1,
    cursor: 'pointer'
  },
  '& .productImageUpload': {
    transitionProperty: 'box-shadow',
    transitionDuration: theme.transitions.duration.short,
    transitionTimingFunction: theme.transitions.easing.easeInOut,
  },
  '& .productImageItem': {
    transitionProperty: 'box-shadow',
    transitionDuration: theme.transitions.duration.short,
    transitionTimingFunction: theme.transitions.easing.easeInOut,
  },
}));

function ProductImagesTab(props) {
  const methods = useFormContext();
  const { control, getValues, setValue, watch } = methods;
  const image_list = watch('image_list');

  const handleAdd = (e) => {
    const reader = new FileReader();
    const file = e.target.files[0];
    reader.readAsDataURL(file);
    reader.onloadend = ((e) => {
      const i = new ProductImage();
      i._file = file;
      i.url = reader.result;
      setValue('image_list', [...cloneDeep(image_list), i], { shouldDirty: true });
    })
  }

  const handleRemove = (index) => {
    const image_list = getValues().image_list;
    image_list.splice(index, 1);
    setValue('image_list', [...cloneDeep(image_list)], { shouldDirty: true });
  }

  return (
    <Root>
      <div className="flex justify-center sm:justify-start flex-wrap -mx-16">
        <label
          htmlFor="button-file"
          className="productImageUpload flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden cursor-pointer shadow hover:shadow-lg"
        >
          <input
            accept="image/*"
            className="hidden"
            id="button-file"
            type="file"
            onChange={handleAdd}
          />
          <Icon fontSize="large" color="action">
            cloud_upload
          </Icon>
        </label>

        <Controller
          name="image_list"
          control={control}
          render={({ field }) => (
            field.value.map((image, index) => {
              const src = (image.id) ? Config.getInstance().getApiBasePath() + '/' + image.url : image.url;
              return <div
                key={index}
                tabIndex={0}
                className='productImageItem flex items-center justify-center relative w-128 h-128 rounded-16 mx-12 mb-24 overflow-hidden outline-none shadow hover:shadow-lg'
              >
                <IconButton className="productImageFeaturedStar" onClick={() => handleRemove(index)}><RemoveCircle /></IconButton>
                <img className="max-w-none w-auto h-full" src={src} alt="product" />
              </div>
            })
          )}
        />
      </div>
    </Root>
  );
}

export default ProductImagesTab;
