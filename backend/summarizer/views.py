from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .serializers import SummarizeSerializer
from .services import generate_summary


@api_view(['POST'])
def summarize_text(request):
    serializer = SummarizeSerializer(data=request.data)

    if not serializer.is_valid():
        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

    text = serializer.validated_data['text']

    try:
        summary = generate_summary(text)

        return Response({
            "success": True,
            "summary": summary
        }, status=status.HTTP_200_OK)

    except Exception as e:
        print("GEMINI ERROR:", repr(e))

        error_message = str(e)

        if "429" in error_message or "RESOURCE_EXHAUSTED" in error_message:
            return Response({
                "success": False,
                "error": "Gemini API daily quota exceeded. Please try again later."
            }, status=status.HTTP_429_TOO_MANY_REQUESTS)

        return Response({
            "success": False,
            "error": "AI service is temporarily unavailable."
        }, status=status.HTTP_503_SERVICE_UNAVAILABLE)