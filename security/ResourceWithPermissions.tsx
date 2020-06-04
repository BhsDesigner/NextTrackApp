import React from 'react';
import { Resource, ResourceProps } from 'ra-core';

interface Props extends ResourceProps {
    permissions: any;
}

export const ResourceWithPermissions = ({
                                            permissions,
                                            name,
                                            list,
                                            create,
                                            edit,
                                            show,
                                            options,
                                            resourceSchema,
                                            manualResource = false,
                                            ...props
                                        }) => {
    const {operations,fields, readableFields, writableFields, resourceSchema: resourceSchemaNew} = resourceSchema;
    if(!operations && !manualResource) return null;
    const access = {
        // enabled: true,
        list: operations ? operations.list : manualResource,
        create: operations ? operations.create : manualResource,
        edit: operations ? operations.edit : manualResource,
        show: operations ? operations.view : manualResource,
    };
    options.operations = operations;
    options.fields = fields;
    options.readableFields = readableFields;
    options.writableFields = writableFields;
    options.resourceSchema = resourceSchemaNew;

    return (
        <Resource
            {...props}
            options={options}
            name={name}
            list={access.list ? list : null}
            create={access.create ? create : null}
            edit={access.edit ? edit : null}
            show={access.show ? show : null}
        />
    );
};
