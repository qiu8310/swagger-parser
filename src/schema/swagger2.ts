// https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md
// https://tools.ietf.org/html/draft-fge-json-schema-validation-00

/**
 * Mime Types
 *
 * definition: https://tools.ietf.org/html/rfc6838
 *
 * @example
 *  text/plain; charset=utf-8
 *  application/json
 *  application/vnd.github+json
 *  application/vnd.github.v3+json
 *  application/vnd.github.v3.raw+json
 *  application/vnd.github.v3.text+json
 *  application/vnd.github.v3.html+json
 *  application/vnd.github.v3.full+json
 *  application/vnd.github.v3.diff
 *  application/vnd.github.v3.patch
 */

 /**
  * HTTP Status Codes
  *
  * definition: https://tools.ietf.org/html/rfc7231#section-6
  * registered status codes: https://www.iana.org/assignments/http-status-codes/http-status-codes.xhtml
  */


export namespace swagger2 {
  // Data Type ts 中只有一些简单的 types

  /** signed 32 bits */
  export type integer = number
  /** signed 64 bits */
  export type long = number
  export type float = number
  export type double = number
  /** base64 encoded characters */
  export type byte = string
  /** any sequence of octets */
  export type binary = string
  /** As defined by full-date - [RFC3339](http://xml2rfc.ietf.org/public/rfc/html/rfc3339.html#anchor14) */
  export type date = string
  /** As defined by date-time - [RFC3339](http://xml2rfc.ietf.org/public/rfc/html/rfc3339.html#anchor14) */
  export type dateTime = string
  /** Used to hint UIs the input needs to be obscured. */
  export type password = string


  export interface Schema {
    /** Specifies the Swagger Specification version being used. It can be used by the Swagger UI and other clients to interpret the API listing. The value MUST be "2.0". */
    swagger: string

    /** Provides metadata about the API. The metadata can be used by the clients if needed. */
    info: InfoObject

    /** The host (name or ip) serving the API. This MUST be the host only and does not include the scheme nor sub-paths. It MAY include a port. If the host is not included, the host serving the documentation is to be used (including the port). The host does not support path templating. */
    host?: string

    /** The base path on which the API is served, which is relative to the host. If it is not included, the API is served directly under the host. The value MUST start with a leading slash (/). The basePath does not support path templating. */
    basePath?: string

    /** The transfer protocol of the API. Values MUST be from the list: `"http"`, `"https"`, `"ws"`, `"wss"`. If the `schemes` is not included, the default scheme to be used is the one used to access the Swagger definition itself. */
    schemes?: Array<'http' | 'https' | 'ws' | 'wss'>

    /** A list of MIME types the APIs can consume. This is global to all APIs but can be overridden on specific API calls. Value MUST be as described under [Mime Types](https://tools.ietf.org/html/rfc6838) */
    consumes?: string[]

    /** A list of MIME types the APIs can produce. This is global to all APIs but can be overridden on specific API calls. Value MUST be as described under [Mime Types](https://tools.ietf.org/html/rfc6838) */
    produces?: string[]

    /** The available paths and operations for the API */
    paths: PathsObject

    /** An object to hold data types produced and consumed by operations. */
    definitions?: DefinitionsObject

    /** An object to hold parameters that can be used across operations. This property does not define global parameters for all operations. */
    parameters?: ParametersDefinitionsObject

    /** An object to hold responses that can be used across operations. This property does not define global responses for all operations. */
    responses?: ResponsesDefinitionsObject

    /** Security scheme definitions that can be used across the specification. */
    securityDefinitions?: SecurityDefinitionsObject

    /** A declaration of which security schemes are applied for the API as a whole. The list of values describes alternative security schemes that can be used (that is, there is a logical OR between the security requirements). Individual operations can override this definition. */
    security?: SecurityRequirementObject[]

    /** A list of tags used by the specification with additional metadata. The order of the tags can be used to reflect on their order by the parsing tools. Not all tags that are used by the [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#operationObject) must be declared. The tags that are not declared may be organized randomly or based on the tools' logic. Each tag name in the list MUST be unique. */
    tags?: TagObject[]

    /** Additional external documentation. */
    externalDocs?: ExternalDocumentationObject
  }

  export interface DefinitionsObject {
    [name: string]: SchemaObject
  }

  /**
   * Holds the relative paths to the individual endpoints. The path is appended to the basePath in order to construct the full URL. The Paths may be empty, due to [ACL constraints](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#securityFiltering).
   */
  export interface PathsObject {
    /** A relative path to an individual endpoint. The field name MUST begin with a slash. The path is appended to the basePath in order to construct the full URL. Path templating is allowed. */
    [path: string]: PathItemObject
  }

  export interface PathItemObject {
    /** Allows for an external definition of this path item. The referenced structure MUST be in the format of a Path Item Object. If there are conflicts between the referenced definition and this Path Item's definition, the behavior is undefined. */
    $ref?: string

    get?: OperationObject
    put?: OperationObject
    post?: OperationObject
    delete?: OperationObject
    options?: OperationObject
    head?: OperationObject
    patch?: OperationObject

    /** A list of parameters that are applicable for all the operations described under this path. These parameters can be overridden at the operation level, but cannot be removed there. The list MUST NOT include duplicated parameters. A unique parameter is defined by a combination of a name and location. The list can use the Reference Object to link to parameters that are defined at the Swagger Object's parameters. There can be one "body" parameter at most. */
    parameters?: ParameterObject[]
  }

  export interface OperationObject {
    /** Unique string used to identify the operation. The id MUST be unique among all operations described in the API. Tools and libraries MAY use the operationId to uniquely identify an operation, therefore, it is recommended to follow common programming naming conventions. */
    operationId: string

    /** A list of tags for API documentation control. Tags can be used for logical grouping of operations by resources or any other qualifier. */
    tags?: string[]
    /** A short summary of what the operation does. For maximum readability in the swagger-ui, this field SHOULD be less than 120 characters. */
    summary?: string
    description?: string
    externalDocs?: ExternalDocumentationObject

    consumes?: string[]
    produces?: string[]
    schemes?: string[]
    deprecated?: boolean
    security?: SecurityRequirementObject
    parameters?: ParameterObject[]
    responses: ResponsesObject
  }

  /**
   * A simple object to allow referencing other definitions in the specification. It can be used to reference parameters and responses that are defined at the top level for reuse.
   * @example
   * {
   *   "$ref": "#/definitions/Pet"
   * }
   */
  export interface ReferenceObject {
    $ref: string
  }

  /** An object to hold parameters to be reused across operations. Parameter definitions can be referenced to the ones defined here. */
  export interface ParametersDefinitionsObject {
    /** A single parameter definition, mapping a "name" to the parameter it defines. */
    [name: string]: ParameterObject
  }

  export type ParameterObject = BodyParameterObject | RestParameterObject

  export interface BaseParameterObject {
    /**
     * The name of the parameter. Parameter names are case sensitive.
     * - If in is "path", the name field MUST correspond to the associated path segment from the path field in the Paths Object. See Path Templating for further information.
     * - For all other cases, the name corresponds to the parameter name used based on the in property.
     */
    name: string
    description?: string
    /** Determines whether this parameter is mandatory. If the parameter is in "path", this property is required and its value MUST be true. Otherwise, the property MAY be included and its default value is false. */
    required?: boolean
  }
  export interface BodyParameterObject extends BaseParameterObject {
    in: 'body'
    schema: SchemaObject
  }
  export interface RestParameterObject extends BaseParameterObject, Validation {
    in: 'query' | 'header' | 'path' | 'formData'
    type: string
    format?: string
    /** Sets the ability to pass empty-valued parameters. This is valid only for either query or formData parameters and allows you to send a parameter with a name only or an empty value. Default value is false. */
    allowEmptyValue?: boolean
    items?: ItemsObject
    collectionFormat?: string
    default?: any
  }

  /** The object provides metadata about the API. The metadata can be used by the clients if needed, and can be presented in the Swagger-UI for convenience. */
  export interface InfoObject {
    /** The title of the application. */
    title: string
    /** A short description of the application. [GFM syntax](https://guides.github.com/features/mastering-markdown/#GitHub-flavored-markdown) can be used for rich text representation. */
    description?: string
    /** The Terms of Service for the API. */
    termsOfService?: string

    /** The contact information for the exposed API. */
    contact?: ContactObject
    /** The license information for the exposed API. */
    license?: LicenseObject
    /** Provides the version of the application API (not to be confused with the specification version). */
    version: string
  }

  /** Contact information for the exposed API. */
  export interface ContactObject {
    /** The identifying name of the contact person/organization. */
    name?: string
    /** The URL pointing to the contact information. MUST be in the format of a URL. */
    url?: string
    /** The email address of the contact person/organization. MUST be in the format of an email address. */
    email?: string
    /** Allows extensions to the Swagger Schema. The field name MUST begin with x-, for example, x-internal-id. The value can be null, a primitive, an array or an object. See Vendor Extensions for further details. */
    [startWithX: string]: any
  }

  /** License information for the exposed API. */
  export interface LicenseObject {
    /** The license name used for the API. */
    name: string
    /** A URL to the license used for the API. MUST be in the format of a URL. */
    url?: string
    /** Allows extensions to the Swagger Schema. The field name MUST begin with x-, for example, x-internal-id. The value can be null, a primitive, an array or an object. See [Vendor Extensions](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#vendorExtensions) for further details. */
    [startWithX: string]: any
  }

  /**
   * An object to hold responses to be reused across operations. Response definitions can be referenced to the ones defined here.
   *
   * This does not define global operation responses.
   *
   * @example
   * {
   *   "NotFound": {
   *     "description": "Entity not found."
   *   },
   *   "IllegalInput": {
   *   	"description": "Illegal input for operation."
   *   },
   *   "GeneralError": {
   *   	"description": "General Error",
   *   	"schema": {
   *   		"$ref": "#/definitions/GeneralError"
   *   	}
   *   }
   * }
   */
  export interface ResponsesDefinitionsObject {
    /** A single response definition, mapping a "name" to the response it defines. */
    [name: string]: ResponseObject
  }

  /**
   * @example
   * {
   *   "200": {
   *     "description": "a pet to be returned",
   *     "schema": {
   *       "$ref": "#/definitions/Pet"
   *     }
   *   },
   *   "default": {
   *     "description": "Unexpected error",
   *     "schema": {
   *       "$ref": "#/definitions/ErrorModel"
   *     }
   *   }
   * }
   */
  export interface ResponsesObject {
    /** The documentation of responses other than the ones declared for specific HTTP response codes. It can be used to cover undeclared responses. Reference Object can be used to link to a response that is defined at the Swagger Object's responses section. */
    default: ResponseObject | ReferenceObject

    /** Any HTTP status code can be used as the property name (one property per HTTP status code). Describes the expected response for that HTTP status code. Reference Object can be used to link to a response that is defined at the Swagger Object's responses section. */
    [HTTP_STATUS_CODE: string]: ResponseObject | ReferenceObject
  }

  export interface ResponseObject {
    /** A short description of the response. GFM syntax can be used for rich text representation. */
    description: string
    /** A definition of the response structure. It can be a primitive, an array or an object. If this field does not exist, it means no content is returned as part of the response. As an extension to the Schema Object, its root type value may also be "file". This SHOULD be accompanied by a relevant produces mime-type. */
    schema?: SchemaObject
    /** A list of headers that are sent with the response. */
    headers?: HeadersObject
    /** An example of the response message. */
    examples?: ExampleObject
  }

  export type SchemaType = 'string' | 'number' | 'integer' | 'boolean' | 'array' | 'object'
  export interface SchemaObject extends Validation {
    $ref?: string
    format?: string
    title?: string
    description?: string
    maxProperties?: integer
    minProperties?: integer
    required?: string[]
    type?: SchemaType | SchemaType[]

    items?: SchemaObject

    allOf?: [SchemaObject]
    anyOf?: [SchemaObject]
    oneOf?: [SchemaObject]

    properties?: {[key: string]: SchemaObject}
    additionalProperties?: {[key: string]: SchemaObject}

    /** Adds support for polymorphism. The discriminator is the schema property name that is used to differentiate between other schema that inherit this schema. The property name used MUST be defined at this schema and it MUST be in the required property list. When used, the value MUST be the name of this schema or any schema that inherits it. */
    discriminator?: string
    /** Relevant only for Schema "properties" definitions. Declares the property as "read only". This means that it MAY be sent as part of a response but MUST NOT be sent as part of the request. Properties marked as readOnly being true SHOULD NOT be in the required list of the defined schema. Default value is false. */
    readOnly?: boolean
    xml?: any
    externalDocs: ExternalDocumentationObject
    example?: any
  }

  export interface HeadersObject {
    /** The name of the property corresponds to the name of the header. The value describes the type of the header. */
    [name: string]: HeaderObject
  }

  export interface HeaderObject extends ItemsObject {}

  /**
   * Allows sharing examples for operation responses.
   *
   * @example
   * {
   *   "application/json": {
   *     "name": "Puma",
   *     "type": "Dog",
   *     "color": "Black",
   *     "gender": "Female",
   *     "breed": "Mixed"
   *   }
   * }
   */
  export interface ExampleObject {
    /** The name of the property MUST be one of the Operation produces values (either implicit or inherited). The value SHOULD be an example of what such a response would look like. */
    [mimeType: string]: any
  }

  export interface Validation {
    default?: any
    /** See https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.1.2 */
    maximum?: number
    /** See https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.1.2 */
    exclusiveMaximum?: boolean
    /** See https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.1.3 */
    minimum?: number
    /** See https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.1.3 */
    exclusiveMinimum?: boolean
    /** See https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.2.1 */
    maxLength?: integer
    /** See https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.2.2 */
    minLength?: integer
    /** See https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.2.3 */
    pattern?: string
    /** See https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.3.2 */
    maxItems?: integer
    /** See https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.3.3 */
    minItems?: integer
    /** See https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.3.4 */
    uniqueItems?: boolean
    /** See https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.5.1 */
    enum?: any[]
    /** See https://tools.ietf.org/html/draft-fge-json-schema-validation-00#section-5.1.1 */
    multipleOf?: number
  }

  /**
   *
   * A limited subset of JSON-Schema's items object. It is used by parameter definitions that are not located in "body".
   *
   * @example A simple header with of an integer type:
   * {
   *   "description": "The number of allowed requests in the current period",
   *   "type": "integer"
   * }
   */
  export interface ItemsObject extends Validation {
    description?: string
    /** The type of the object. The value MUST be one of "string", "number", "integer", "boolean", or "array". */
    type: 'string' | 'number' | 'integer' | 'boolean' | 'array'
    /** The extending format for the previously mentioned type. See [Data Type Formats](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#dataTypeFormat) for further details. */
    format?: string

    /** Required if type is "array". Describes the type of items in the array. */
    items?: ItemsObject

    /**
     * Determines the format of the array if type array is used. Possible values are:
     *  - csv - comma separated values foo,bar.
     *  - ssv - space separated values foo bar.
     *  - tsv - tab separated values foo\tbar.
     *  - pipes - pipe separated values foo|bar.
     *  - Default value is csv.
     */
    collectionFormat?: string
  }


  /**
   *
   * Lists the required security schemes to execute this operation. The object can have multiple security schemes declared in it which are all required (that is, there is a logical AND between the schemes).
   *
   * The name used for each property MUST correspond to a security scheme declared in the [Security Definitions](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#securityDefinitions).
   */
  export interface SecurityRequirementObject {
    /** Each name must correspond to a security scheme which is declared in the Security Definitions. If the security scheme is of type "oauth2", then the value is a list of scope names required for the execution. For other security scheme types, the array MUST be empty. */
    [name: string]: string[]
  }

  /** A declaration of the security schemes available to be used in the specification. This does not enforce the security schemes on the operations and only serves to provide the relevant details for each scheme. */
  export interface SecurityDefinitionsObject {
    /** A single security scheme definition, mapping a "name" to the scheme it defines. */
    [name: string]: SecuritySchemeObject
  }

  /**
   * Allows the definition of a security scheme that can be used by the operations. Supported schemes are basic authentication, an API key (either as a header or as a query parameter) and OAuth2's common flows (implicit, password, application and access code).
   *
   * @example
   *  {
   *    "type": "oauth2",
   *    "authorizationUrl": "http://swagger.io/api/oauth/dialog",
   *    "flow": "implicit",
   *    "scopes": {
   *      "write:pets": "modify pets in your account",
   *      "read:pets": "read your pets"
   *    }
   *  }
   */
  export interface SecuritySchemeObject {
    /** The type of the security scheme. Valid values are "basic", "apiKey" or "oauth2" */
    type: string
    /** A short description for security scheme. */
    description?: string
    /** The name of the header or query parameter to be used. */
    name: string
    /** The location of the API key. Valid values are "query" or "header" */
    in: string
    /** The flow used by the OAuth2 security scheme. Valid values are "implicit", "password", "application" or "accessCode" */
    flow: string
    /** The authorization URL to be used for this flow. This SHOULD be in the form of a URL */
    authorizationUrl: string
    /** The token URL to be used for this flow. This SHOULD be in the form of a URL. */
    tokenUrl: string
    /** The available scopes for the OAuth2 security scheme. */
    scopes: ScopesObject
  }

  /**
   * Lists the available scopes for an OAuth2 security scheme.
   *
   * @example
   *
   * {
   *   "write:pets": "modify pets in your account",
   *   "read:pets": "read your pets"
   * }
   */
  export interface ScopesObject {
    /** Maps between a name of a scope to a short description of it (as the value of the property). */
    [name: string]: string
  }

  /** Allows adding meta data to a single tag that is used by the [Operation Object](https://github.com/OAI/OpenAPI-Specification/blob/master/versions/2.0.md#operationObject). It is not mandatory to have a Tag Object per tag used there. */
  export interface TagObject {
    /** The name of the tag. */
    name: string
    /** A short description for the tag. GFM syntax can be used for rich text representation. */
    description?: string
    /** Additional external documentation for this tag. */
    externalDocs?: ExternalDocumentationObject
    /** Allows extensions to the Swagger Schema. The field name MUST begin with x-, for example, x-internal-id. The value can be null, a primitive, an array or an object. See Vendor Extensions for further details. */
    [startWithX: string]: any
  }

  /** Allows referencing an external resource for extended documentation. */
  export interface ExternalDocumentationObject {
    /** The URL for the target documentation. Value MUST be in the format of a URL. */
    url: string
    /** A short description of the target documentation. [GFM syntax](https://guides.github.com/features/mastering-markdown/#GitHub-flavored-markdown) can be used for rich text representation. */
    description?: string
    /** Allows extensions to the Swagger Schema. The field name MUST begin with x-, for example, x-internal-id. The value can be null, a primitive, an array or an object. See Vendor Extensions for further details. */
    [startWithX: string]: any
  }
}
