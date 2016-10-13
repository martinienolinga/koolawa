<?php

/* TwigBundle:Exception:traces.txt.twig */
class __TwigTemplate_1258c266259aa9060239d5e9c6720c65baeea9f14612d5991b89ea32c4a3b71c extends Twig_Template
{
    public function __construct(Twig_Environment $env)
    {
        parent::__construct($env);

        $this->parent = false;

        $this->blocks = array(
        );
    }

    protected function doDisplay(array $context, array $blocks = array())
    {
        $__internal_0f0282a17ddd5531abbb441fe75b2608c5ed2f101463fa7f558e39bb6c0e4f62 = $this->env->getExtension("native_profiler");
        $__internal_0f0282a17ddd5531abbb441fe75b2608c5ed2f101463fa7f558e39bb6c0e4f62->enter($__internal_0f0282a17ddd5531abbb441fe75b2608c5ed2f101463fa7f558e39bb6c0e4f62_prof = new Twig_Profiler_Profile($this->getTemplateName(), "template", "TwigBundle:Exception:traces.txt.twig"));

        // line 1
        if (twig_length_filter($this->env, $this->getAttribute((isset($context["exception"]) ? $context["exception"] : $this->getContext($context, "exception")), "trace", array()))) {
            // line 2
            $context['_parent'] = $context;
            $context['_seq'] = twig_ensure_traversable($this->getAttribute((isset($context["exception"]) ? $context["exception"] : $this->getContext($context, "exception")), "trace", array()));
            foreach ($context['_seq'] as $context["_key"] => $context["trace"]) {
                // line 3
                $this->loadTemplate("@Twig/Exception/trace.txt.twig", "TwigBundle:Exception:traces.txt.twig", 3)->display(array("trace" => $context["trace"]));
                // line 4
                echo "
";
            }
            $_parent = $context['_parent'];
            unset($context['_seq'], $context['_iterated'], $context['_key'], $context['trace'], $context['_parent'], $context['loop']);
            $context = array_intersect_key($context, $_parent) + $_parent;
        }
        
        $__internal_0f0282a17ddd5531abbb441fe75b2608c5ed2f101463fa7f558e39bb6c0e4f62->leave($__internal_0f0282a17ddd5531abbb441fe75b2608c5ed2f101463fa7f558e39bb6c0e4f62_prof);

    }

    public function getTemplateName()
    {
        return "TwigBundle:Exception:traces.txt.twig";
    }

    public function isTraitable()
    {
        return false;
    }

    public function getDebugInfo()
    {
        return array (  30 => 4,  28 => 3,  24 => 2,  22 => 1,);
    }
}
/* {% if exception.trace|length %}*/
/* {% for trace in exception.trace %}*/
/* {% include '@Twig/Exception/trace.txt.twig' with { 'trace': trace } only %}*/
/* */
/* {% endfor %}*/
/* {% endif %}*/
/* */
