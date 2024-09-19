const { updateFlashcardController } = require('../src/controllers/updateFlashcardController');
const { updateFlashcard } = require('../src/services/updateFlashcard');
const { getFlashcardById } = require('../src/services/getFlashcardById');

jest.mock('../src/services/updateFlashcard');
jest.mock('../src/services/getFlashcardById');

describe('Update Flashcard Controller', () => {
    let req, res;

    beforeEach(() => {
        req = {
            body: {
                "category": "Network Operation",
                "multiAnswer": false,
                "question": "A new wireless network has been dropping connections. Network technician Sarah is troubleshooting the issue and discovers that there is another wireless network in the area. What best explains the reason for the dropped connections?",
                "answers": ["Interference", "SSID mismatch", "Latency", "Encryption type"],
                "correctAnswer": ["Interference"],
                "definition": ["In wireless networking, interference occurs when multiple wireless networks operate on the same or overlapping frequency channels. This can cause signals to collide and degrade, resulting in dropped connections, reduced network performance, and instability. When Sarah discovers another wireless network in the area, it is likely that both networks are operating on the same or nearby channels, leading to interference and causing the connection issues."]
            },
            params: {
                flashcardId: 2
            }
        };

        res = {
            json: jest.fn(),
            status: jest.fn().mockReturnThis(),
        };
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('should successfully updated record', async () => {
        getFlashcardById.mockResolvedValue({
            "id": 3,
            "category": "Network Operation",
            "multianswer": false,
            "question": "A new wireless network has been dropping connections. Network technician Sarah is troubleshooting the issue and discovers that there is another wireless network in the area. What best explains the reason for the dropped connections?",
            "answers": [
                "Interference",
                "SSID mismatch",
                "Latency",
                "Encryption type"
            ],
            "correctanswer": [
                "Interference"
            ],
            "definition": [
                "Interference: In wireless networking, interference occurs when multiple wireless networks operate on the same or overlapping frequency channels. This can cause signals to collide and degrade, resulting in dropped connections, reduced network performance, and instability. When Sarah discovers another wireless network in the area, it is likely that both networks are operating on the same or nearby channels, leading to interference and causing the connection issues."
            ],
            "updated_at": "2024-09-19T02:17:20.428Z",
            "created_at": "2024-09-19T02:17:20.428Z"
        });

        updateFlashcard.mockResolvedValue({
            "success": true,
            "data": {
                "id": 3,
                "category": "Network Operation",
                "multianswer": false,
                "question": "A new wireless network has been dropping connections. Network technician Sarah is troubleshooting the issue and discovers that there is another wireless network in the area. What best explains the reason for the dropped connections?",
                "answers": [
                    "Interference",
                    "SSID mismatch",
                    "Latency",
                    "Encryption type"
                ],
                "correctanswer": [
                    "Interference"
                ],
                "definition": [
                    "In wireless networking, interference occurs when multiple wireless networks operate on the same or overlapping frequency channels. This can cause signals to collide and degrade, resulting in dropped connections, reduced network performance, and instability. When Sarah discovers another wireless network in the area, it is likely that both networks are operating on the same or nearby channels, leading to interference and causing the connection issues."
                ],
                "updated_at": "2024-09-19T05:24:47.992Z",
                "created_at": "2024-09-19T02:17:20.428Z"
            },
            "error": null,
            "message": "Successfully updated record"
        });

        await updateFlashcardController(req, res);

        expect(updateFlashcard).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            "data": {
                "success": true,
                "data": {
                    "id": 3,
                    "category": "Network Operation",
                    "multianswer": false,
                    "question": "A new wireless network has been dropping connections. Network technician Sarah is troubleshooting the issue and discovers that there is another wireless network in the area. What best explains the reason for the dropped connections?",
                    "answers": [
                        "Interference",
                        "SSID mismatch",
                        "Latency",
                        "Encryption type"
                    ],
                    "correctanswer": [
                        "Interference"
                    ],
                    "definition": [
                        "In wireless networking, interference occurs when multiple wireless networks operate on the same or overlapping frequency channels. This can cause signals to collide and degrade, resulting in dropped connections, reduced network performance, and instability. When Sarah discovers another wireless network in the area, it is likely that both networks are operating on the same or nearby channels, leading to interference and causing the connection issues."
                    ],
                    "updated_at": "2024-09-19T05:24:47.992Z",
                    "created_at": "2024-09-19T02:17:20.428Z"
                },
                "error": null,
                "message": "Successfully updated record"
            }
        }));
    });

    it('should return 404 when record not found', async () => {
        getFlashcardById.mockResolvedValue(null);

        await updateFlashcardController(req, res);

        expect(updateFlashcard).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            success: false,
            data: null,
            error: "Record not found",
            message: "No record not found with the provided ID"
        }));
    });

    it('should return 400 when bad request', async () => {
        req.params.flashcardId = "";

        await updateFlashcardController(req, res);

        expect(updateFlashcard).not.toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(400);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            success: false,
            data: null,
            error: "Bad Request: Missing flashcard ID",
            message: "Failed to update record"
        }));
    });

    it('should return 500 when fails to update', async () => {
        getFlashcardById.mockResolvedValue({
            "id": 2,
            "category": "Network Operation",
            "multianswer": false,
            "question": "A new wireless network has been dropping connections. Network technician Sarah is troubleshooting the issue and discovers that there is another wireless network in the area. What best explains the reason for the dropped connections?",
            "answers": [
                "Interference",
                "SSID mismatch",
                "Latency",
                "Encryption type"
            ],
            "correctanswer": [
                "Interference"
            ],
            "definition": [
                "Interference: In wireless networking, interference occurs when multiple wireless networks operate on the same or overlapping frequency channels. This can cause signals to collide and degrade, resulting in dropped connections, reduced network performance, and instability. When Sarah discovers another wireless network in the area, it is likely that both networks are operating on the same or nearby channels, leading to interference and causing the connection issues."
            ],
            "updated_at": "2024-09-19T02:17:20.428Z",
            "created_at": "2024-09-19T02:17:20.428Z"
        });

        updateFlashcard.mockRejectedValue(new Error('Failed to update record'));

        await updateFlashcardController(req, res);

        expect(updateFlashcard).toHaveBeenCalledWith(req.params.flashcardId, req.body);
        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
            success: false,
            data: null,
            error: "Failed to update record",
            message: "Failed to update record"
        }));
    });
})