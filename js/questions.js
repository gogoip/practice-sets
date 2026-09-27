// Practice Questions Data Store
const questionBank = [
  {
    id: 1,
    category: "Coercion Engine",
    question: "How does Pydantic handle the string value '42' when assigned to an integer field in a BaseModel?",
    options: [
      "Raises a ValidationError immediately.",
      "Automatically coerces string '42' into integer 42.",
      "Leaves it as string '42' without validation.",
      "Converts it to float 42.0."
    ],
    correct: 1,
    explanation: "Pydantic performs type parsing and coercion by default. String representation of numbers like '42' are cleanly converted into proper Python integers."
  },
  {
    id: 2,
    category: "Re-Validation",
    question: "When you modify a model attribute after instantiation (e.g. user.age = -5), does Pydantic validate it by default?",
    options: [
      "Yes, all mutations are validated automatically.",
      "No, validation only runs during object creation unless validate_assignment = True.",
      "No, validation never runs after instantiation under any configuration.",
      "Yes, but only in strict mode."
    ],
    correct: 1,
    explanation: "By default, Pydantic validates during creation. To validate mutations after instantiation, set 'model_config = ConfigDict(validate_assignment=True)'."
  },
  {
    id: 3,
    category: "Standalone Validation",
    question: "Which feature allows you to validate arbitrary data types (like list[int] or dict[str, float]) without creating a full BaseModel class?",
    options: [
      "TypeAdapter",
      "RootModel",
      "BaseSettings",
      "@validate_call"
    ],
    correct: 0,
    explanation: "TypeAdapter in Pydantic V2 lets you perform validation, coercion, and serialization on primitive types or complex generics directly."
  },
  {
    id: 4,
    category: "Function Decorator",
    question: "What does applying the @validate_call decorator to a standard Python function do?",
    options: [
      "It speeds up execution using PyPy compilation.",
      "It validates function argument types at call runtime according to type hints.",
      "It turns the function into a FastAPI endpoint.",
      "It serializes function return values into JSON automatically."
    ],
    correct: 1,
    explanation: "@validate_call intercepts every invocation of a decorated function and validates all incoming parameters against their type annotations."
  },
  {
    id: 5,
    category: "Environment Settings",
    question: "Which package handles loading and validating environment variables and .env files into typed models in Pydantic V2?",
    options: [
      "pydantic-core",
      "pydantic-settings",
      "pydantic-env",
      "pydantic-config"
    ],
    correct: 1,
    explanation: "In Pydantic V2, BaseSettings was moved to its own official package: 'pydantic-settings'."
  },
  {
    id: 6,
    category: "FastAPI Integration",
    question: "How does FastAPI utilize Pydantic models when passed as parameter type hints in route handlers?",
    options: [
      "It uses them strictly for documentation.",
      "It automatically parses request JSON bodies, validates types, and generates OpenAPI schemas.",
      "It executes them in a separate asynchronous database thread.",
      "It converts them into SQL tables."
    ],
    correct: 1,
    explanation: "FastAPI relies heavily on Pydantic for request body parsing, payload type validation, custom response serialization, and auto-generating Swagger/OpenAPI docs."
  },
  {
    id: 7,
    category: "Custom Validators",
    question: "In Pydantic V2, which decorator is used to inspect or transform individual field values before or after validation?",
    options: [
      "@validator",
      "@field_validator",
      "@check_field",
      "@model_validator"
    ],
    correct: 1,
    explanation: "Pydantic V2 replaced the V1 @validator with @field_validator for field-level validation, and @model_validator for root/model-wide validation."
  },
  {
    id: 8,
    category: "Root / Single-Value",
    question: "Which class is specifically designed to validate a single top-level data structure, such as a top-level JSON array of strings?",
    options: [
      "RootModel",
      "BaseModel",
      "TypeAdapter",
      "DataClass"
    ],
    correct: 0,
    explanation: "RootModel[T] allows you to define a model where the root value itself is a non-dict type, like RootModel[list[str]]."
  }
];

const flashcardBank = [
  {
    title: "Data Coercion Engine",
    body: "Pydantic converts raw incoming data into python types (e.g., '100' → integer 100). If coercion fails, a <code>ValidationError</code> is raised."
  },
  {
    title: "Re-Validation via validate_assignment",
    body: "By default, Pydantic validates on initialization. Enable <code>model_config = ConfigDict(validate_assignment=True)</code> to validate attribute changes after instantiation."
  },
  {
    title: "TypeAdapter for Generic Types",
    body: "Use <code>TypeAdapter(list[int]).validate_python(['1', '2'])</code> to validate collections without declaring a <code>BaseModel</code> class."
  },
  {
    title: "Function Calls (@validate_call)",
    body: "Decorate standard functions with <code>@validate_call</code> to validate function parameters dynamically every time the function is called."
  },
  {
    title: "pydantic-settings Package",
    body: "Use <code>BaseSettings</code> from <code>pydantic-settings</code> to read environment variables and <code>.env</code> files directly into strongly-typed objects."
  },
  {
    title: "Field vs Model Validators",
    body: "Use <code>@field_validator</code> for single attributes and <code>@model_validator(mode='after')</code> when validation depends on multiple fields."
  }
];
