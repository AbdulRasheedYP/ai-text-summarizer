from rest_framework import serializers

class SummarizeSerializer(serializers.Serializer):
    text =serializers.CharField(
        required=True,
        allow_blank=False
    )
