import { useQuery} from 'react-admin';

export const useResourceScheme = (resourcename = null, authenticated = true) => {
  const { data, loading, error, loaded } = useQuery({
      type: 'getIntrospect',
      resource: null,
      payload: {authenticated: authenticated }
  }, {action: 'SCHEMA_FETCH'});

  if(error) {
      return { data, loading, error, loaded };
  }
  if(data){
    if(resourcename) return  {data: data.apiSchema[resourcename], loading, error, loaded };
    return {data: data.apiSchema, loading, error, loaded };
  }
  return { data, loading, error, loaded };
};
