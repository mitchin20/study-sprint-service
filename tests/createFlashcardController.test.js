const { createFlashcardController } = require('../src/controllers/createFlashcardController');
const { createFlashcard } = require('../src/services/createFlashcard');

jest.mock('../src/services/createFlashcard');

describe('Create Flashcard Controller', () => {
    let req, res;

    beforeEach(() => {
        req = {
            body: {
                "category": "Network Security",
                "multiAnswer": false,
                "question": "You are a network administrator looking to implement security using the CIA model. You want to ensure that all data saved to your servers remains consistent from source to destination. Which topic of the CIA model are you following?",
                "answers": ["Reliability", "Availability", "Confidentiality", "Integrity"],
                "correctAnswer": ["Integrity"],
                "definition": ["Ensures that data remains accurate, consistent, and unaltered from source to destination"]
            }
        };

        res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    })

    it('should successfully created new record', async () => {
        createFlashcard.mockResolvedValue({
            "success": true,
            "data": {
                "id": 4,
                "category": "Network Security",
                "multianswer": false,
                "question": "You are a network administrator looking to implement security using the CIA model. You want to ensure that all data saved to your servers remains consistent from source to destination. Which topic of the CIA model are you following?",
                "answers": [
                    "Reliability",
                    "Availability",
                    "Confidentiality",
                    "Integrity"
                ],
                "correctanswer": [
                    "Integrity"
                ],
                "definition": [
                    "Ensures that data remains accurate, consistent, and unaltered from source to destination"
                ],
                "updated_at": "2024-09-19T02:18:52.684Z",
                "created_at": "2024-09-19T02:18:52.684Z"
            },
            "error": null,
            "message": "Successfully created new record"
        });

        await createFlashcardController(req, res);

        expect(createFlashcard).toHaveBeenCalledWith(req.body);
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            "data": {
                "success": true,
                "data": {
                    "id": 4,
                    "category": "Network Security",
                    "multianswer": false,
                    "question": "You are a network administrator looking to implement security using the CIA model. You want to ensure that all data saved to your servers remains consistent from source to destination. Which topic of the CIA model are you following?",
                    "answers": [
                        "Reliability",
                        "Availability",
                        "Confidentiality",
                        "Integrity"
                    ],
                    "correctanswer": [
                        "Integrity"
                    ],
                    "definition": [
                        "Ensures that data remains accurate, consistent, and unaltered from source to destination"
                    ],
                    "updated_at": "2024-09-19T02:18:52.684Z",
                    "created_at": "2024-09-19T02:18:52.684Z"
                },
                "error": null,
                "message": "Successfully created new record"
            }
        }));
    });

    it('should return 500 when validation fails', async () => {
        req.body = {};

        await createFlashcardController(req, res);

        expect(createFlashcard).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            success: false,
            data: null,
            error: "correctAnswer is a required field",
            message: "Failed to create new record"
        }));
    });
})